const mongoose = require("mongoose");

const { Schema } = mongoose;

// TODO: change all date: String to date: Date

const studentSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  age: Number,
  class_grade: Number,
  GPA: Number,
  registering_next_year_classes: [
    {
      class_id: String,
      subject_name: String,
      teacher_name: String,
      _id: false,
    },
  ],
  current_classes: [
    {
      class_id: String,
      subject_name: String,
      teacher_name: String,
      letter_grade: String,
      _id: false,
    },
  ],
  previous_subjects_taken: [
    {
      class_id: String,
      subject_name: String,
      teacher_name: String,
      letter_grade: String,
      _id: false,
    },
  ],
  detention_count: Number,
  address: String,
});

module.exports = mongoose.model("Student", studentSchema);
