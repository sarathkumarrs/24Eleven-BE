const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

// Create user (register)
exports.createUser = async (req, res) => {
  try {
    console.log(req.body);
    
    const { email, password, phone_number, first_name, last_name,role} = req.body;

    // Check for existing user
        if (!email || !password || !first_name) {
      return res.status(400).json({
        message: "Email, password, and first name are required",
      });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
      phone_number,
      first_name,
      last_name,
      role,
    });

    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Create user error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Update user profile
exports.updateUser = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from JWT in auth middleware
    const { phone_number, first_name, last_name, email } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update only fields provided
    user.phone_number = phone_number || user.phone_number;
    user.first_name = first_name || user.first_name;
    user.last_name = last_name || user.last_name;
    user.email = email || user.email;

    await user.save();

    res.json({ message: "User updated", user });
  } catch (error) {
    console.error("Update user error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
