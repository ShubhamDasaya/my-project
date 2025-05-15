const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    stream: { type: String, required: true },
    sem: { type: Number, required: true }, // Ensure consistency with EJS
    codingLevel: { type: String, required: true },
});

module.exports = mongoose.model("Student", studentSchema);
