import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

//connect to mongoDB
// const uri = `mongodb+srv://${username}:${password}@feedbackcluster.rimgkgl.mongodb.net/feedbackDatabase?retryWrites=true&w=majority`;
const uri = `mongodb://127.0.0.1:27017/feedbackx?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.3`;
const clientOptions = { serverApi: { version: "1", strict: true, deprecationErrors: true } };

const connectToDB = async () => {
  try {
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    throw new Error("Error connecting to database " + error);
  }
};

const disconnectFromDB = async () => {
  try {
    await mongoose.disconnect();
  } catch (error) {
    console.log("Error disconnecting to database " + error);
  }
};

export { connectToDB, disconnectFromDB };
