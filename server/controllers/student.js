require("dotenv").config();
const Student = require("../models/student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getStudent = async (req, res, next) => {
  const id = req.userId;
  try {
    const student = await Student.findById(id);
    res.status(200).json({ result: student });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
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
      {
        email: existingStudent.email.toLowerCase(),
        password,
        id: existingStudent._id,
      },
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
    //TODO: give a detailed validation for each element
    // then in client side make dynamic responses
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
      { email, password, id: result._id },
      process.env.SECRET_KEY,
      { expiresIn: "2h" }
    );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

exports.validate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ valid: false });
  }
  try {
    jwt.verify(token, process.env.SECRET_KEY);
    res.status(200).json({ valid: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Token is invalid" });
  }
};
