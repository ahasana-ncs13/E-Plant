const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

const uri = `mongodb+srv://${process.env.DBUser}:${process.env.BDpassword}@cluster0.j6dmigp.mongodb.net/?appName=Cluster0`;

app.use(cors());
app.use(express.json());

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

    const plantDB = client.db("plantDB");
    const plantCollection = plantDB.collection("allplant");

    app.get("/allplant", async (req, res) => {
      const cursor = plantCollection.find({});
      const allplant = await cursor.toArray();
      res.send(allplant)
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("E-Plant shop is running");
});

app.listen(port, () => {
  console.log(`e-plant app listening on port ${port}`);
});
