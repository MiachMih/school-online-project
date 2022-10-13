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
    const filter = class_prerequisites.map((item) => {
      return { _id: item };
    });
    const new_class_prerequisites = await Classes.find({}, "class_name")
      .or(filter)
      .lean();
    const refactor_class_prerequisites = new_class_prerequisites.map((item) => {
      return { class_id: item._id, prerequisite_class_name: item.class_name };
    });

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
    res.status(200).json({ message: "succ" });
  } catch (error) {
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

exports.addStudentToClassByPassword = async (req, res, next) => {
  const id = req.userId;
  const class_password = req.body?.classPassword;
  try {
    const { name: student_name } = await Student.findById(id);
    const class_id = req.body?.classId;
    const _class = await Classes.findById(class_id).lean();
    if (!_class) {
      return res.status(400).json({ message: "no class found with such id" });
    }
    const is_password_valid = await bcrypt.compare(
      _class.password,
      class_password
    );
    if (!is_password_valid) {
      return res.status(400).json({ message: "Invalid class password" });
    }
    const updated_student_list = [
      ..._class.student_list,
      { student_name, student_id: id },
    ];
    const result = await Classes.findOneAndUpdate(
      { _id: class_id },
      { student_list: updated_student_list }
    ).lean();
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ message: "server error" + error.message });
  }
};

exports.addStudentToClass = async (req, res, next) => {
  const { id } = req.body;
  const student_id = req.userId;
  // TODO: make a session so that everything gets updated in every place appropriately
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

    if (isEnrolled) {
      session.endSession();
      return res.status(200).json({ message: "student already enrolled" });
    }

    // check that student has all the prerequisites
    const student = await Student.findById(student_id).lean();
    const student_class = await Classes.findById(id).lean();
    const checkMap = new Map();
    for (const item of student.previous_subjects_taken) {
      checkMap.set(item.subject_name, true);
    }

    for (const item of student_class.class_prerequisites) {
      if (!checkMap.has(item)) {
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
    );

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
    );

    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ result: response });
  } catch (error) {
    await session.abortTransaction();
    res.status(404).json({ message: error.message });
  }
};

exports.dropStudentFromClass = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  session.endSession();
  // TODO make sure to pass session to each database request
  try {
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
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

    //TODO implement mongoose-unique-validator
    // so that the app doesn't break on error
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
