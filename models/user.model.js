const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  phone_number: { type: String },
  password: { type: String, required: true },
  first_name: { type: String },
  last_name: { type: String },
  last_login: { type: Date },
  is_superuser: { type: Boolean, default: false },
  is_active: { type: Boolean, default: true },
  is_staff: { type: Boolean, default: false },
  role: {
    type: String,
    enum: ["user","customer", "franchise_owner", "delivery_agent", "hub_manager",],
    default: "user",
  },
});

module.exports = mongoose.model("User", UserSchema);