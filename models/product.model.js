const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true }, // price per unit
    image: { type: String },
    sku_number: { type: String, unique: true, sparse: true },

    // ✅ NEW FIELDS
    quantity: {
      type: Number,
      required: true,
      default: 1
    },
    unit: {
      type: String,
      enum: ["kg", "g", "litre", "ml", "pcs", "dozen", "bundle", "pack"],
      default: "pcs"
    },

    slug: { type: String, unique: true, lowercase: true, trim: true },
    is_active: { type: Boolean, default: true },
    is_featured: { type: Boolean, default: false },
    discount_limit: { type: Number, default: 0 },
    cashback_percentage: { type: Number, default: 0 },
    cashback_limit: { type: Number, default: 0 },

    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

// 🔄 Auto-slug
ProductSchema.pre("save", function (next) {
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }
  next();
});

module.exports = mongoose.model("Product", ProductSchema);
