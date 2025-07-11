
// 🔸 Create Product
const Product = require("../models/product.model");

// 🔸 Create Product with validation
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      unit_type,
      stock_quantity,
      category_id,
      discount_limit,
      cashback_percentage,
      cashback_limit,
      sku_number,
    } = req.body;

    // ✅ Validate required fields
    if (!name || !price || !unit_type || !stock_quantity || !category_id) {
      return res.status(400).json({
        message: "name, price, unit_type, stock_quantity, and category_id are required",
      });
    }

    // Optional: validate price/quantity are positive numbers
    if (price < 0 || stock_quantity < 0) {
      return res.status(400).json({ message: "Price and quantity must be positive" });
    }

    // ✅ Auto-generate slug
    // const slug = name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

    // ✅ Create product
    const product = new Product({
      name,
      description,
      price,
      unit_type,
      stock_quantity,
      category_id,
    //   is_active: is_active ?? true,
    //   is_featured: is_featured ?? false,
      discount_limit,
      cashback_percentage,
      cashback_limit,
      sku_number,
    //   slug,
    });

    await product.save();

    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    console.error("Create product error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


// 🔸 Get all Products in a Category
exports.getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const products = await Product.find({ category_id: categoryId });
    res.json(products);
  } catch (error) {
    console.error("Get products error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// 🔸 Update Product
exports.updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const updated = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
    });
    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product updated", product: updated });
  } catch (error) {
    console.error("Update product error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// 🔸 Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const deleted = await Product.findByIdAndDelete(productId);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted" });
  } catch (error) {
    console.error("Delete product error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const Category = require("../models/category.model");

// 🔹 Create Category
exports.createCategory = async (req, res) => {
  try {
    const {
        franchise_id,
      name,
      description,
      parent_category_id,
    } = req.body;

    // Validation
    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    // Create slug from name
    // const slug = name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

    const category = new Category({
     franchise_id,
      name,
      description,
      parent_category_id: parent_category_id || null,
    });

    await category.save();

    res.status(201).json({ message: "Category created", category });
  } catch (error) {
    console.error("Create category error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getCategoriesByFranchise = async (req, res) => {
  try {
    const { franchiseId } = req.params;

    const categories = await Category.find({ franchise_id: franchiseId }).sort({ name: 1 });

    res.json({ categories });
  } catch (error) {
    console.error("Get categories by franchise error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
// 🔹 Get a category by both franchiseId and categoryId
exports.getCategoryByFranchiseAndId = async (req, res) => {
  try {
    const { franchiseId, categoryId } = req.params;

    const category = await Category.findOne({
      _id: categoryId,
      franchise_id: franchiseId,
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found for this franchise" });
    }

    res.json({ category });
  } catch (error) {
    console.error("Get category by franchise & ID error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};



// 🔹 Get paginated products by category
exports.getProductsByCategoryPaginated = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      Product.find({ category_id: categoryId })
        .skip(skip)
        .limit(limit)
        .sort({ name: 1 }), // optional sort
      Product.countDocuments({ category_id: categoryId })
    ]);

    res.json({
      products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Paginated fetch error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};