const mongoose = require("mongoose");

const CustomerProfileSchema = new mongoose.Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default: "",
    },
    current_location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [lng, lat]
        required: true,
      },
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// ✅ Fix: Index the correct field and use the correct schema name
CustomerProfileSchema.index({ current_location: "2dsphere" });

module.exports = mongoose.model("CustomerProfile", CustomerProfileSchema);
