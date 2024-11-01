const Bisection = require("../models/bisectionModel");
const Test = require("../models/testModel");

exports.getAll = async (req, res) => {
  // try {
  //   const bisection = await Bisection.find();
  //   res.send(bisection);
  // } catch (error) {
  //   console.log(error);
  // }
  try {
    const test = await test.find();
    res.send(test);
  } catch (error) {
    console.log(error);
  }
};

exports.createDB = async (req, res) => {
  try {
    console.log(req.body);
    const bisection = await Bisection.create(req.body);
    res.send(bisection);
  } catch (error) {
    console.log(error);
  }
};

exports.remove = async (req, res) => {
  try {
    console.log(req.body);
    const bisection = await Bisection.findByIdAndDelete(req.body.id);
    res.send(bisection);
  } catch (error) {
    console.log(error);
  }
};
