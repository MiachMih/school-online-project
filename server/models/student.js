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
  honors_classes_taken: Number,
  registering_next_year_classes: [
    {
      subject_name: String,
      teacher_name: String,
      classroom: String,
      honors: Boolean,
      date: String,
    },
  ],
  current_classes: [
    {
      subject_name: String,
      teacher_name: String,
      classroom: String,
      honors: Boolean,
      letter_grade: String,
      date: String,
    },
  ],
  previous_subjects_taken: [
    {
      subject_name: String,
      teacher_name: String,
      classroom: String,
      honors: Boolean,
      letter_grade: String,
      date: String,
    },
  ],
  detention_count: Number,
  address: String,
});

module.exports = mongoose.model("Student", studentSchema);
