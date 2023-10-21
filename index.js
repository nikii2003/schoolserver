import express from "express";
import student from "./src/models/student.js";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const app = express();

app.use(express.json());

const MONGODB_URI ="";

const connectMongoDB = async () => {
  const conn = mongoose.connect(process.env.MONGODB_URI);
  if (conn) {
    console.log("connection successfully...");
  }
};
connectMongoDB();
app.get("/students", async (req, res) => {
  const students = await student.find();
  res.json({
    success: true,
    data: students,
    message: "MongoDB connected successful .",
  });
});
app.post("/student", async (req, res) => {
  const { name, age, mobile, email } = req.body;
  if (!name) {
    return res.json({
      success: false,
      message: "name is requred..",
    });
  }
  if (!age) {
    return res.json({
      success: false,
      message: "age is required...",
    });
  }

  if (!mobile) {
    return res.json({
      success: false,
      message: "mobile is required...",
    });
  }

  if (!email) {
    return res.json({
      success: false,
      message: "email is required...",
    });
  }
  const newStudent = new student({
    name: name,
    age: age,
    mobile: mobile,
    email: email,
  });
  const saveStudent = await newStudent.save();
  res.json({
    success: true,
    data: saveStudent,
    message: "successfully added new student",
  });
});

app.get("/student", async (req, res) => {
  const { email } = req.query;
  const Student = await student.findOne({ email: email });

  // let student=null;
  // students.forEach((stud)=>{
  // if(stud.id == id){
  //     student=stud;
  // }
  // })

  // if(student == null){
  //    res.json({
  //     success:false,
  //     message:"student not found.."
  //    })
  // }
  res.json({
    success: true,
    data: Student,
    message: "succesfully added new student...",
  });
});
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`server is runing on PORT ${PORT}`);
});
