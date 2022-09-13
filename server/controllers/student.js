require("dotenv").config();
const Student = require("../models/student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getStudent = async (req, res, next) => {
  const id = req.userId;
  const password = req.userPassword;

  try {
    const student = await Student.findById(id);
    const result = { ...student._doc, password: password };
    res.status(200).json({ result });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.updateStudent = async (req, res, next) => {
  const id = req.userId;
  const { email, password, name, age, address } = req.body;
  //TODO: give a detailed validation for each element
  // then in client side make dynamic responses
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const student = await Student.findOneAndUpdate(
      { _id: id },
      { email, password: hashedPassword, name, age, address }
    );

    const token = jwt.sign({ email, password, id }, process.env.SECRET_KEY, {
      expiresIn: "2h",
    });

    const result = { ...student._doc, password: password };
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

exports.loginStudent = async (req, res, next) => {
  try {
    //TODO: give a detailed validation for each element
    // then in client side make dynamic responses
    const { email, password } = req.body;
    const existingStudent = await Student.findOne({
      email: email.toLowerCase(),
    });
    if (!existingStudent) {
      return res.status(400).json({ message: "Student doesn't exist" });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingStudent.password
    );

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

    const result = { ...existingStudent._doc, password: password };
    res.status(200).json({ result, token });
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

    const student = await Student.create({
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
    const result = { ...student._doc, password: password };

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
    return res.status(200).json({ valid: false });
  }
  try {
    jwt.verify(token, process.env.SECRET_KEY);
    res.status(200).json({ valid: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Token is invalid" });
  }
};
