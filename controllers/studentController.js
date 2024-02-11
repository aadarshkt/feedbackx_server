import { connectToDB, disconnectFromDB } from "../config/db.js";
import { Student } from "../models/student.js";

const getAllStudents = async (req, res) => {
  try {
    await connectToDB();
    const students = await Student.find().exec();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  } finally {
    await disconnectFromDB();
  }
};

//create new user with all the info, name, roll no, email, courses.
const createNewUser = async (req, res) => {
  const subId = req.auth.payload.sub;
  const { name, roll_no, email } = req.body;
  const new_student = {
    sub: subId,
    name: name,
    roll_no: roll_no,
    email: email,
    sessions: [
      {
        name: "2023-24",
        semesters: [
          {
            name: "Winter-semester",
            courses: [
              {
                name: "Digital Image Processing",
                feedback: "",
              },
            ],
          },
        ],
      },
    ],
  };
  try {
    await connectToDB();
    const newStudent = new Student(new_student);
    const result = await newStudent.save();
    res.status(200).json({ message: "student created successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await disconnectFromDB();
  }
};

//get required options for any student
const getOptions = async (req, res) => {
  const subId = req.auth.payload.sub;
  console.log(subId);
  try {
    await connectToDB();
    const result = await Student.findOne({ sub: subId });
    if (result == null) {
      res.status(400).json({ message: "Bad request, user not found" });
      return;
    }
    // console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: "Bad request" });
    console.log(error);
  } finally {
    await disconnectFromDB();
  }
};

//update student with summary of one course
const updateFeedback = async (req, res) => {
  const { roll_no, session, semester, course, feedback } = req.body;
  console.log(roll_no, feedback);
  const filter = { roll_no: roll_no, "sessions.name": session, "sessions.semesters.courses.name": course };
  const update = { $set: { "sessions.$[session].semesters.$[semester].courses.$[course].feedback": feedback } };
  const arrayFilters = [{ "session.name": session }, { "semester.name": semester }, { "course.name": course }];
  try {
    await connectToDB();
    const result = await Student.findOneAndUpdate(filter, update, { new: true, arrayFilters: arrayFilters });
    res.status(200).json({ message: "feedback updated successfully", result: result });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Bad request", error: error });
  } finally {
    await disconnectFromDB();
  }
};

export { getAllStudents, updateFeedback, getOptions, createNewUser };
