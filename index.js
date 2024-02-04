import express from "express";
import dotenv from "dotenv";
import cors from "cors";

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

app.get("/", (req, res) => {
  res.status(200).json({ message: "Success" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
