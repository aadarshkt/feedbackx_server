import express from "express";
import { createNewUser, getAllStudents, getOptions, updateFeedback } from "../controllers/studentController.js";

const router = express.Router();

//get all students
//not requried at all
router.post("/add-profile-info", createNewUser);
router.get("/all", getAllStudents);
router.get("/", getOptions);
router.put("/", updateFeedback);

export { router as studentRouter };
