const express = require("express");
const router = express.Router();
const { createDB, getAll, remove } = require("../controllers/bisection");

router.post("/bisection", createDB);
router.get("/bisection", getAll);
router.delete("/bisection", remove);

module.exports = router;
