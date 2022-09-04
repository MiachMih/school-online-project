require("dotenv").config();
const Student = require("../models/student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { response } = require("express");

exports.getStudents = (req, res, next) => {
  Student.find({})
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postStudent = (req, res, next) => {
  const student = new Student({ ...req.body });
  student
    .save()
    .then(() => {
      console.log("Student added to database");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.loginStudent = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingStudent = await Student.findOne({
      email: email.toLowerCase(),
    });
    if (!existingStudent) {
      return res.status(400).json({ message: "Student doesn't exist" });
    }

    const isPasswordValid = bcrypt.compare(password, existingStudent.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { email: existingStudent.email, password: existingStudent.password },
      process.env.SECRET_KEY,
      { expiresIn: "2h" }
    );

    res.status(200).json({ result: existingStudent, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

exports.signupStudent = async (req, res, next) => {
  const { email, name, password, address, age, class_grade } = req.body;
  try {
    const existingStudent = await Student.findOne({ email });

    if (!(email && name && password && address && age && class_grade)) {
      return res.status(400).json({ message: "All inputs are required" });
    }

    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await Student.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
      address,
      age,
      class_grade,
      honors_classes_taken: 0,
      detention_count: 0,
      GPA: 4,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.SECRET_KEY,
      { expiresIn: "2h" }
    );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};
