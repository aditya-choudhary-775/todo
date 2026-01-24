const express = require("express");
const { getUserData } = require("../controllers/user.controller");

const router = express.Router();

router.get("/user", getUserData);

module.exports = router;