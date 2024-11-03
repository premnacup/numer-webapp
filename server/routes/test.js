const express = require("express");
const router = express.Router();
const { createDB, getAll } = require("../controllers/test");

router.post("/", createDB);
router.get("/", getAll);

module.exports = router;
