const Bisection = require("../models/bisectionModel");

exports.getAll = async (req, res) => {
  try {
    const bisection = await Bisection.find();
    res.send(bisection);
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
