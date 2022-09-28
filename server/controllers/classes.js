require("dotenv").config();
const passwordGenerator = require("generate-password");
const Classes = require("../models/classes");
const Student = require("../models/student");
const bcrypt = require("bcryptjs");

// TODO: make pagination here for students
exports.getClasses = async (req, res, next) => {
  try {
    const result = await Classes.find(
      {},
      "class_name teacher_name student_list class_description class_prerequisites schedule"
    ).lean();
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
  const id = req.userId;
  try {
  } catch (error) {}
};

exports.getClassPrerequisites = async (req, res, next) => {
  try {
    const { id } = req.body;
    const result = await Classes.find({ id }, "class_prerequisites").lean();
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
  const id = req.serId;
  try {
    //TODO: check prerequisites
    // if doesn't qualify then send status 403 not allowed to register for this class
    // if all checks out then update student_list with new student
  } catch (error) {}
};

// TODO: return the class password
// TODO: authorize only to teacher and admin roles
exports.getClassPassword = async (req, res, next) => {};

// TODO: restrict this method to admin and teacher roles
// TODO: create new auth middleware for admins specifically
exports.addNewClass = async (req, res, next) => {
  try {
    const {
      class_name,
      teacher_name,
      class_description,
      class_prerequisites,
      schedule,
    } = req.body;

    let password;
    if (
      !(
        class_name &&
        teacher_name &&
        class_description &&
        class_prerequisites &&
        schedule
      )
    ) {
      return res.status(400).json({ message: "All inputs are required" });
    }

    if (!req.body?.password) {
      // generates random number with length of 5
      // does not contain zeroes

      // TODO: store the actual password somewhere
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
    });

    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};
