import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
  },
});

const semesterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  courses: [courseSchema],
});

const sessionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  semesters: [semesterSchema],
});

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  roll_no: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  sessions: [sessionSchema],
});

const Student = mongoose.model("students", studentSchema);

export { Student };
