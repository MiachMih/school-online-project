const mongoose = require("mongoose");

const { Schema } = mongoose;

const classesSchema = new Schema({
  class_name: {
    type: String,
    unique: true,
  },
  teacher_name: String,
  student_list: [{ student_name: String, student_id: String, _id: false }],
  class_description: String,
  class_prerequisites: [
    { class_id: String, prerequisite_class_name: String, _id: false },
  ],
  schedule: {
    Monday: Boolean,
    Tuesday: Boolean,
    Wednesday: Boolean,
    Thursday: Boolean,
    Friday: Boolean,
    Saturday: Boolean,
    Sunday: Boolean,
  },
  password: String,
});

module.exports = mongoose.model("Classes", classesSchema);
