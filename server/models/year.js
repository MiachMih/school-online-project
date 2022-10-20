const mongoose = require("mongoose");

const { Schema } = mongoose;

const yearSchema = new Schema({
  isYearInProgress: Boolean,
});

module.exports = mongoose.model("Year", yearSchema);
