import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { studentRouter } from "./routes/studentRoutes.js";
import { connectToDB, disconnectFromDB } from "./config/db.js";
import { auth, requiredScopes } from "express-oauth2-jwt-bearer";

dotenv.config();
const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//checkJWT middleware check for access token
// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: process.env.AUTH0_API_IDENTIFIER,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  tokenSigningAlg: process.env.TOKEN_SIGNING_ALGO,
});
app.use(checkJwt);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Success" });
});

app.use("/api/students", studentRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
