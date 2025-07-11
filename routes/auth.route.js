const express = require("express");
const router = express.Router();
const { createUser } = require("../controllers/user.controller");
const {login, refresh}=require('../controllers/authcontroller')
// const verifyToken = require("../middleware/auth.middleware");

// Register user
router.post("/register", createUser);

// Login user
router.post("/login", login);

// // Get current user
router.post("/refresh",refresh);

module.exports = router;
