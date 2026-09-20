require("node:dns").setServers(["8.8.8.8", "1.1.1.1"]);

const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { ObjectId } = require("mongodb");
const { GoogleGenAI, Type } = require("@google/genai");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// ====================== MIDDLEWARE ======================

app.use(cors());
app.use(express.json());

// ====================== GEMINI AI ======================

// 2. Initialize the official client. It automatically picks up process.env.GEMINI_API_KEY
const ai = new GoogleGenAI();

// ====================== MONGODB ======================
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dmnxhxd.mongodb.net/?appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  await client.connect();

  const db = client.db("AI-Learner");
  const userCollection = db.collection("Users");
  const searchInfoCollection = db.collection("Search Infos");

  // ====================== USERS API ======================

  // Create new user
  app.post("/users", async (req, res) => {
    const userInfo = req.body;
    const existingUser = await userCollection.findOne({
      email: userInfo.email,
    });
    if (existingUser) {
      return res.status(400).send({
        message: "User already exists",
      });
    }
    const result = await userCollection.insertOne(userInfo);
    res.status(201).send(result);
  });

  // Get user
  app.get("/users/:email", async (req, res) => {
    const email = req.params.email;
    const user = await userCollection.findOne({
      email,
    });
    res.send(user);
  });

  // ====================== AI QUIZ API ======================

  app.post("/search-data", async (req, res) => {
    const { searchData, email, userAnswers, userScore, topicName, query } =
      req.body;

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

  app.get("/search-data", async (req, res) => {
    const { email } = req.query;
    console.log("Email received:", email);

    const result = await searchInfoCollection
      .find({ email: email })
      .sort({ createdAt: -1 })
      .toArray();

    console.log("Found documents:", result.length);
    res.send(result);
  });

  app.patch("/mark-favourite", async (req, res) => {
    const { id, favouriteTopic } = req.body;
    const result = await searchInfoCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          favouriteTopic: favouriteTopic,
        },
      },
    );

    res.send(result);
  });

  app.post("/generate-quiz", async (req, res) => {
    const { topicName, query } = req.body;

    // Validate request
    if (!topicName || !query) {
      return res.status(400).send({
        message: "Topic name and query are required",
      });
    }
    console.log("Generating quiz...");
    console.log("Topic:", topicName);
    console.log("Query:", query);

    // 3. Request structured JSON using the updated gemini-3.6-flash model
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
        // Enforce rigid schema constraint to guarantee structural compatibility
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

    // 4. Extract text payload and parse it back to the client app
    const quizText = response.text;
    const quiz = JSON.parse(quizText);
    res.status(200).send(quiz);
  });
  console.log("✅ Successfully connected to MongoDB!");
}
run();

// post search data

// ====================== TEST ROUTE ======================
app.get("/", (req, res) => {
  res.send("AI Learning Agent Server is running");
});
// ====================== START SERVER ======================
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
