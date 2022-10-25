require("dotenv").config();
const Teacher = require("../models/teacher");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

exports.getTeacher = async (req, res, next) => {
  const id = req.userId;
  const password = req.userPassword;
  try {
    const teacher = await Teacher.findById(id).lean();
    const result = { ...teacher, password: password };
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

exports.updateTeacher = async (req, res, next) => {
  const id = req.userId;
  const { email, password, name, age, address } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const teacher = await Teacher.findOneAndUpdate(
      { _id: id },
      { email, password: hashedPassword, name, age, address }
    ).lean();

    const token = jwt.sign({ email, password, id }, process.env.SECRET_KEY, {
      expiresIn: "2h",
    });

    const result = { ...teacher, password: password };
    return res.status(200).json({ result, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.loginTeacher = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingTeacher = await Teacher.findOne({
      email: email.toLowerCase(),
    }).lean();

    if (!existingTeacher) {
      return res.status(400).json({ message: "Teacher doesn't exist" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingTeacher.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        email: existingTeacher.email.toLowerCase(),
        password,
        id: existingTeacher._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "2h" }
    );

    const result = { ...existingTeacher, password: password };
    return res.status(200).json({ result, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.signupTeacher = async (req, res, next) => {
  const { email, name, password, address, age } = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const existingTeacher = await Teacher.findOne({ email }).lean();
    if (!(email && name && password && address && age)) {
      return res.status(400).json({ message: "All inputs are required" });
    }
    if (existingTeacher) {
      return res.status(400).json({ message: "Teacher already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const teacher = await Teacher.create(
      [
        {
          email: email.toLowerCase(),
          password: hashedPassword,
          name,
          address,
          age,
        },
      ],
      { session }
    );
    const result = { ...teacher[0]._doc, password: password };

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
