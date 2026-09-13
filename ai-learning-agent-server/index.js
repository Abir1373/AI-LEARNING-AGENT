require("node:dns").setServers(["8.8.8.8", "1.1.1.1"]);
const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
// const bcrypt = require("bcrypt"); // Uncomment only if you need it later

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

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

    // ====================== USERS API ======================

    // Create new user
    app.post("/users", async (req, res) => {
      const userInfo = req.body;

      // Check if user already exists
      const existingUser = await userCollection.findOne({
        email: userInfo.email,
      });

      if (existingUser) {
        return res.status(400).send({ message: "User already exists" });
      }

      // Insert new user
      const result = await userCollection.insertOne(userInfo);
      res.status(201).send(result);
    });

    app.get("/users/:email", async (req, res) => {
      const email = req.params.email;
      const user = await userCollection.findOne({ email });
      res.send(user);
    });

    console.log("✅ Successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

// Test route
app.get("/", (req, res) => {
  res.send("AI Learning Agent Server is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
