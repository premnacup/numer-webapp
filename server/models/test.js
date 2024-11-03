const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  equation: { type: String, required: true },
  a: { type: Number, required: true },
  b: { type: Number, required: true },
  answer: { type: Number, required: true },
});

module.exports = mongoose.model("test", testSchema);
