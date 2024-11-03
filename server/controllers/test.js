const test = require("../models/test");
exports.getAll = async (req, res) => {
  try {
    const request = await test.find();
    res.send(request);
  } catch (error) {
    console.log(error);
  }
};

exports.createDB = async (req, res) => {
  try {
    console.log(req.body);
    const response = await test.create(req.body);
    res.send(response);
  } catch (error) {
    console.log(error);
  }
};
