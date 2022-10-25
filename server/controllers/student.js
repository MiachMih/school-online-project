require("dotenv").config();
const Student = require("../models/student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

exports.getStudent = async (req, res, next) => {
  const id = req.userId;
  const password = req.userPassword;

  try {
    const student = await Student.findById(id).lean();
    const result = { ...student, password: password };
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

exports.updateStudent = async (req, res, next) => {
  const id = req.userId;
  const { email, password, name, age, address } = req.body;
  //TODO: give a detailed validation for each element
  // then in client side make dynamic responses
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    await Student.updateOne(
      { _id: id },
      { email, password: hashedPassword, name, age, address }
    ).lean();
    const student = await Student.findById(id);
    const token = jwt.sign({ email, password, id }, process.env.SECRET_KEY, {
      expiresIn: "2h",
    });

    const result = { ...student, password: password };
    return res.status(200).json({ result, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.loginStudent = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    //TODO: give a detailed validation for each element
    // then in client side make dynamic responses
    if (!(email && password)) {
      const isEmail = email.length === 0;
      const isPassword = password.length === 0;
      return res
        .status(400)
        .json({ result: { email: !isEmail, password: !isPassword } });
    }

    const existingStudent = await Student.findOne({
      email: email.toLowerCase(),
    }).lean();

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

    const result = { ...existingStudent, password: password };
    return res.status(200).json({ result, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.signupStudent = async (req, res, next) => {
  const { email, name, password, address, age, class_grade } = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const existingStudent = await Student.findOne({ email }).lean();
    //TODO: give a detailed validation for each element
    // then in client side make dynamic responses
    if (!(email && name && password && address && age && class_grade)) {
      return res.status(400).json({ message: "All inputs are required" });
    }

    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const response = await Student.create(
      [
        {
          email: email.toLowerCase(),
          password: hashedPassword,
          name,
          address,
          age,
          class_grade,
          honors_classes_taken: 0,
          detention_count: 0,
          GPA: 4,
        },
      ],
      { session }
    );

    const student = { ...response[0]._doc };

    const result = { ...student, password: password };
    const token = jwt.sign(
      { email, password, id: result._id },
      process.env.SECRET_KEY,
      { expiresIn: "2h" }
    );

    await session.commitTransaction();
    session.endSession();
    return res.status(201).json({ result, token });
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.validate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(200).json({ valid: false });
  }
  try {
    jwt.verify(token, process.env.SECRET_KEY);
    return res.status(200).json({ valid: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
