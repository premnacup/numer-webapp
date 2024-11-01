const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("Test", testSchema);
