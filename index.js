import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

dotenv.config();
const port = process.env.PORT || 8080;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

//connect to mongoDB
const uri = `mongodb+srv://${username}:${password}@feedbackcluster.rimgkgl.mongodb.net/?retryWrites=true&w=majority`;
const clientOptions = { serverApi: { version: "1", strict: true, deprecationErrors: true } };
async function run() {
  try {
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.log(error);
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}
run();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Success" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
