const express = require("express");
const router = express.Router();
const bisectionRoute = require("./bisection");
const testRoute = require("./test");

router.use("/bisection", bisectionRoute);
router.use("/test", testRoute);

module.exports = router;
