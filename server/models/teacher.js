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
  registering_next_year_classes: [
    {
      subject_name: String,
      date: String,
    },
  ],
  current_classes_taught: [
    {
      subject_name: String,
    },
  ],
  previous_subjects_taken: [
    {
      subject_name: String,
      date: String,
    },
  ],
});

module.exports = mongoose.model("Teacher", teacherSchema);
