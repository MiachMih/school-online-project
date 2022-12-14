require("dotenv").config();
const passwordGenerator = require("generate-password");
const Classes = require("../models/classes");
const Student = require("../models/student");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

// TODO: make pagination here for students
exports.getClasses = async (req, res, next) => {
  const result = res.result;
  try {
    // console.log(result);
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

exports.getClassesNames = async (req, res, next) => {
  try {
    const result = await Classes.find({}, "class_name").lean();
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

exports.getClassById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Classes.findById(id).lean();
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

exports.updateClass = async (req, res, next) => {
  const {
    _id: id,
    teacher_name,
    class_prerequisites,
    class_description,
    schedule,
    subject,
  } = req.body;

  try {
    let refactor_class_prerequisites = [];
    if (class_prerequisites.length > 0) {
      const filter = class_prerequisites.map((item) => {
        return { _id: item };
      });
      const new_class_prerequisites = await Classes.find({}, "class_name")
        .or(filter)
        .lean();
      refactor_class_prerequisites = new_class_prerequisites.map((item) => {
        return { class_id: item._id, prerequisite_class_name: item.class_name };
      });
    }

    await Classes.updateOne(
      { _id: id },
      {
        teacher_name,
        class_description,
        schedule,
        subject,
        class_prerequisites: refactor_class_prerequisites,
      }
    );

    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

exports.getClassPrerequisites = async (req, res, next) => {
  const { id } = req.body;
  try {
    const result = await Classes.find(
      { _id: id },
      "class_prerequisites"
    ).lean();
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

exports.addStudentToClass = async (req, res, next) => {
  const { id } = req.body;
  const student_id = req.userId;

  const session = await mongoose.startSession();
  session.startTransaction();
  // make sure to pass session to each database request

  try {
    if (!id) {
      res.status(400).json({ message: "no class id" });
    }

    // check if the student is already enrolled in the class
    const isEnrolled = await Classes.exists({
      _id: id,
      student_list: { $elemMatch: { student_id: student_id } },
    });
    const student = await Student.findById(student_id).lean();

    if (isEnrolled) {
      session.endSession();
      return res.status(200).json({
        message: "student already enrolled",
        result: { ...student, password: req.userPassword },
      });
    }

    // check that student has all the prerequisites
    const student_class = await Classes.findById(id).lean();
    const checkMap = new Map();
    for (const item of student.previous_subjects_taken) {
      checkMap.set(item.subject_name, true);
    }

    for (const item of student_class.class_prerequisites) {
      if (!checkMap.has(item.prerequisite_class_name)) {
        session.endSession();
        return res
          .status(403)
          .json({ message: "student doesn't have all the prerequisites" });
      }
    }

    // Update the student list with the new student added to class
    const newStudentList = [
      ...student_class.student_list,
      { student_name: student.name, student_id: student._id },
    ];

    const response = await Classes.updateOne(
      { _id: id },
      { student_list: newStudentList }
    ).session(session);

    // update the student's registered next year classes
    const newClassCart = [
      ...student.registering_next_year_classes,
      {
        class_id: id,
        subject_name: student_class.class_name,
        teacher_name: student_class.teacher_name,
      },
    ];

    await Student.updateOne(
      { _id: student_id },
      { registering_next_year_classes: newClassCart }
    ).session(session);

    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ result: response });
  } catch (error) {
    await session.abortTransaction();
    res.status(404).json({ message: error.message });
  }
};

exports.dropStudentFromClass = async (req, res, next) => {
  const { remove_classes_id } = req.body;
  const student_id = req.userId;

  const session = await mongoose.startSession();
  session.startTransaction();
  const filter = remove_classes_id.map((id) => {
    return { class_id: id };
  });
  const class_filter = remove_classes_id.map((id) => {
    return { _id: id };
  });

  try {
    await Student.updateOne(
      { _id: student_id },
      {
        $pull: {
          registering_next_year_classes: {
            $or: filter,
          },
        },
      }
    )
      .session(session)
      .lean();

    await Classes.updateMany(
      { $or: class_filter },
      {
        $pull: {
          student_list: {
            student_id: student_id,
          },
        },
      }
    )
      .session(session)
      .lean();

    const student = await Student.findById(student_id);
    const result = { ...student };
    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ result: result });
  } catch (error) {
    await session.abortTransaction();
    res.status(404).json({ message: error.message });
  }
};

// returns the class password
exports.getClassPassword = async (req, res, next) => {
  const { id } = req.body;
  try {
    const result = await Classes.find({ _id: id }, "password").lean();
    res.status(200).json({ result });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.startYear = async (req, res, next) => {};

exports.addNewClass = async (req, res, next) => {
  try {
    const {
      class_name,
      teacher_name,
      class_description,
      class_prerequisites,
      schedule,
      subject,
    } = req.body;

    let password;
    if (
      !(
        class_name &&
        teacher_name &&
        class_description &&
        class_prerequisites &&
        schedule &&
        subject
      )
    ) {
      return res.status(400).json({ message: "All inputs are required" });
    }

    const isExists = await Classes.exists({ class_name });
    if (isExists) {
      return res.status(400).json({ message: "Class already exists" });
    }

    if (!req.body?.password) {
      // generates random number with length of 5
      // does not contain zeroes

      password = passwordGenerator.generate({
        length: 5,
        numbers: true,
        lowercase: false,
        uppercase: false,
        exclude: "0",
      });
    } else {
      password = req.body.password;
    }

    const result = Classes.create({
      class_name,
      teacher_name,
      class_description,
      class_prerequisites,
      schedule,
      password,
      subject,
    });

    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};
