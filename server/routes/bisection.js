const express = require("express");
const router = express.Router();
const { createDB, getAll } = require("../controllers/bisection");

router.post("/bisection", createDB);
router.get("/bisection", getAll);

module.exports = router;
