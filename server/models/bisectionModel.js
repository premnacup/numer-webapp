const mongoose = require("mongoose");

const bisectionSchema = new mongoose.Schema({
  equation: { type: String, required: true },
  xl: { type: Number, required: true },
  xr: { type: Number, required: true },
  answer: { type: Number, required: true },
});

module.exports = mongoose.model("Bisection", bisectionSchema);
