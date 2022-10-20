const mongoose = require("mongoose");

const { Schema } = mongoose;

const teacherSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  age: Number,
  address: String,
});

module.exports = mongoose.model("Teacher", teacherSchema);
