const mongoose = require("mongoose");

const { Schema } = mongoose;

const announcementSchema = new Schema({
  header: String,
  message: String,
  img: String,
});

module.exports = mongoose.model("Announcement", announcementSchema);
