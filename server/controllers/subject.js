const Subject = require("../models/subject");

exports.getSubjects = async (req, res, next) => {
  try {
    const result = await Subject.find({}, "name").lean();
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

exports.addSubject = async (req, res, next) => {
  const { name } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ message: "No name provided" });
    }
    const isExists = await Subject.exists({ name });
    if (isExists) {
      return res.status(400).json({ message: "Subject already exists" });
    }
    await Subject.create({ name });
    return res.status(200);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
