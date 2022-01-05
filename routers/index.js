const express = require("express");
const questions = require("./questions");
const auth = require("./auth");

const router = express.Router();

router.use("/auth", auth);
router.use("/questions", questions);


module.exports = router;