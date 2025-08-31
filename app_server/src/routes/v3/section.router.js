const express = require("express");
const router = express.Router();

const { getSections } = require("../../controllers/v3/section.controller");

router.get("/", getSections);

module.exports = router;
