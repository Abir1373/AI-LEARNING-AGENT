require("node:dns").setServers(["8.8.8.8", "1.1.1.1"]);

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { GoogleGenAI, Type } = require("@google/genai");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// gemini
const ai = new GoogleGenAI();

// mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dmnxhxd.mongodb.net/?appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const db = client.db("AI-Learner");
    const userCollection = db.collection("Users");
    const searchInfoCollection = db.collection("Search Infos");
    const contactCollection = db.collection("Contact");

    // ====================== JWT MIDDLEWARES ======================

    const verifyToken = (req, res, next) => {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).send({ message: "Unauthorized access" });
      }

      const token = authHeader.split(" ")[1];

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(403).send({ message: "Forbidden access" });
        }
        req.decoded = decoded;
        next();
      });
    };

    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const user = await userCollection.findOne({ email });

      if (!user || user.role !== "admin") {
        return res.status(403).send({ message: "Forbidden: Admin only" });
      }
      next();
    };

    // ====================== AUTH API ======================

    // Create JWT Token
    app.post("/jwt", async (req, res) => {
      const user = req.body;

      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "7d",
      });

      res.send({ token });
    });

    // ====================== USERS API ======================

    // Create new user (with bcrypt password hashing)
    app.post("/users", async (req, res) => {
      const userInfo = req.body;

      const existingUser = await userCollection.findOne({
        email: userInfo.email,
      });

      if (existingUser) {
        return res.status(400).send({ message: "User already exists" });
      }

      // Hash password if provided
      if (userInfo.password) {
        const salt = await bcrypt.genSalt(10);
        userInfo.password = await bcrypt.hash(userInfo.password, salt);
      }

      // Default role
      if (!userInfo.role) {
        userInfo.role = "user";
      }

      const result = await userCollection.insertOne(userInfo);
      res.status(201).send(result);
    });

    // Login with email + password (bcrypt compare)
    app.post("/login", async (req, res) => {
      const { email, password } = req.body;

      const user = await userCollection.findOne({ email });

      if (!user) {
        return res.status(401).send({ message: "User not found" });
      }

      if (!user.password) {
        return res
          .status(401)
          .send({ message: "Password not set for this user" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).send({ message: "Invalid password" });
      }

      // Create JWT
      const token = jwt.sign(
        { email: user.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "7d" },
      );

      // Don't send password to frontend
      const { password: pwd, ...userWithoutPassword } = user;

      res.send({
        token,
        user: userWithoutPassword,
      });
    });

    // Get single user
    app.get("/users/:email", verifyToken, async (req, res) => {
      const email = req.params.email;

      if (req.decoded.email !== email) {
        const user = await userCollection.findOne({ email: req.decoded.email });
        if (user?.role !== "admin") {
          return res.status(403).send({ message: "Forbidden access" });
        }
      }

      const user = await userCollection.findOne({ email });
      // Remove password before sending
      if (user?.password) {
        delete user.password;
      }
      res.send(user);
    });

    // Get all users (Admin only)
    app.get("/users", verifyToken, verifyAdmin, async (req, res) => {
      const result = await userCollection.find().toArray();

      // Remove passwords
      const safeUsers = result.map(({ password, ...user }) => user);
      res.send(safeUsers);
    });

    // Update user role (Admin only)
    app.patch("/users/role/:id", verifyToken, verifyAdmin, async (req, res) => {
      const { id } = req.params;
      const { role } = req.body;

      const result = await userCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { role } },
      );

      res.send(result);
    });

    // ====================== AI QUIZ API ======================

    app.post("/search-data", verifyToken, async (req, res) => {
      const { searchData, email, userAnswers, userScore, topicName, query } =
        req.body;

      if (req.decoded.email !== email) {
        return res.status(403).send({ message: "Forbidden access" });
      }

      const result = await searchInfoCollection.insertOne({
        searchData,
        email,
        userAnswers,
        userScore,
        topicName,
        query,
        favouriteTopic: false,
        createdAt: new Date(),
      });

      res.send({ success: true, insertedId: result.insertedId });
    });

    app.get("/search-data", verifyToken, async (req, res) => {
      const { email } = req.query;

      if (req.decoded.email !== email) {
        return res.status(403).send({ message: "Forbidden access" });
      }

      const result = await searchInfoCollection
        .find({ email })
        .sort({ createdAt: -1 })
        .toArray();

      res.send(result);
    });

    app.get("/search-data/all", verifyToken, verifyAdmin, async (req, res) => {
      const result = await searchInfoCollection
        .find()
        .sort({ createdAt: -1 })
        .toArray();
      res.send(result);
    });

    app.delete(
      "/search-data/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const { id } = req.params;
        const result = await searchInfoCollection.deleteOne({
          _id: new ObjectId(id),
        });
        res.send(result);
      },
    );

    app.patch("/mark-favourite", verifyToken, async (req, res) => {
      const { id, favouriteTopic } = req.body;

      const result = await searchInfoCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { favouriteTopic } },
      );

      res.send(result);
    });

    // ====================== CONTACT API ======================

    app.post("/contact", async (req, res) => {
      const contactData = {
        ...req.body,
        createdAt: new Date(),
      };
      const result = await contactCollection.insertOne(contactData);
      res.send({ success: true, insertedId: result.insertedId });
    });

    app.get("/contact", verifyToken, verifyAdmin, async (req, res) => {
      const result = await contactCollection
        .find()
        .sort({ createdAt: -1 })
        .toArray();
      res.send(result);
    });

    app.delete("/contact/:id", verifyToken, verifyAdmin, async (req, res) => {
      const { id } = req.params;
      const result = await contactCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    // ====================== GENERATE QUIZ ======================

    app.post("/generate-quiz", verifyToken, async (req, res) => {
      const { topicName, query } = req.body;

      if (!topicName || !query) {
        return res.status(400).send({
          message: "Topic name and query are required",
        });
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: `
        You are an expert quiz generator.
        Create a quiz based on:
          Topic: ${topicName}
          Query: ${query}
          Generate exactly 10 multiple-choice questions.
          Each question must have:
          1. A clear question
          2. Exactly 4 options
          3. One correct answer
          4. A short explanation
        `,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              questions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    question: { type: Type.STRING },
                    options: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                    correctAnswer: { type: Type.STRING },
                    explanation: { type: Type.STRING },
                  },
                  required: [
                    "question",
                    "options",
                    "correctAnswer",
                    "explanation",
                  ],
                },
              },
            },
            required: ["questions"],
          },
        },
      });

      const quizText = response.text;
      const quiz = JSON.parse(quizText);
      res.status(200).send(quiz);
    });

    console.log("✅ Successfully connected to MongoDB!");
  } finally {
    // keep connection open
  }
}

run().catch(console.dir);

// ====================== TEST ROUTE ======================
app.get("/", (req, res) => {
  res.send("AI Learning Agent Server is running");
});

// ====================== START SERVER ======================
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
