// models/Course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  course_name: String,
  price: Number,
  description: String
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
