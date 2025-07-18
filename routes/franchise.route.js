const express = require("express");
const router = express.Router();

const {
  createFranchise,getMyFranchiseById,getMyFranchises,
  updateFranchise,
  findNearestFranchise,
} = require("../controllers/franchise.controller");
const {createCategory, getCategoriesByFranchise, getCategoryByFranchiseAndId,createProduct,getProductsByCategoryPaginated, getFranchiseProductsPaginated}=require('../controllers/categoryProduct.controller')

const verifyToken = require("../middleware/auth");
router.get('/',verifyToken,getMyFranchises)
router.get('/nearest',verifyToken,findNearestFranchise)
router.get('/:id',verifyToken,getMyFranchiseById)

// ✅ Create a new franchise (requires authentication)

router.post("/", verifyToken, createFranchise);

// ✅ Update an existing franchise by ID (requires authentication)
router.put("/:id", verifyToken, updateFranchise);

router.post('/categorys/',verifyToken,createCategory)
router.get('/:franchiseId/categorys/',verifyToken, getCategoriesByFranchise);
router.get('/:franchiseId/categorys/:categoryId',verifyToken, getCategoryByFranchiseAndId);
router.post('/products',verifyToken,createProduct)
router.get('/category/:categoryId/products/',verifyToken,getProductsByCategoryPaginated)
router.get('/:franchiseId/products/',verifyToken,getFranchiseProductsPaginated)

module.exports = router;