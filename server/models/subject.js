const mongoose = require("mongoose");

const { Schema } = mongoose;

const subjectSchema = new Schema({
  name: { type: String, unique: true },
});

module.exports = mongoose.model("Subject", subjectSchema);
