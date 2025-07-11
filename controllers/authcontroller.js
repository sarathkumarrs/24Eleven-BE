// auth.controller.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/token");

// --- LOGIN ---
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // If you plan to store refresh token in DB later, do this:
  // user.refreshToken = refreshToken;
  // await user.save();

  res.status(200).json({
    access_token: accessToken,
    refresh_token: refreshToken,
  });
};

// --- REFRESH TOKEN ---
exports.refresh = async (req, res) => {
  console.log(12);
  
  const { refresh_token } = req.body;
  if (!refresh_token) return res.sendStatus(401);

  try {
    const payload = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(payload.id);

    if (!user) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user); // Optional

    res.status(200).json({
      access_token: newAccessToken,
      refresh_token: newRefreshToken, // optional
    });
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
