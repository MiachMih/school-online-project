const mongoose = require('mongoose');

const { Schema } = mongoose;

const studentSchema = new Schema({
    name: String
});

module.exports = mongoose.model('Student', studentSchema)