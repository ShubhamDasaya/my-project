const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
    name: { type: String, required: true },
  designation: { type: String, required: true },
  department: { type: String, required: true },
  contact: { type: String, required: true },
})

module.exports = mongoose.model("Faculty", facultySchema);
