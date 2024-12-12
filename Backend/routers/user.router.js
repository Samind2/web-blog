const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user.controller");

//http://localhost:5000/api/v1/auth/register (Path)
router.post("/register", userControllers.register);

module.exports = router;
