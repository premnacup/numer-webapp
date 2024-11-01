const express = require("express");
const router = express.Router();
const bisectionRoute = require("./bisection");

router.use("/bisection", bisectionRoute);

module.exports = router;
