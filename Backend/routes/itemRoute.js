const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.get('/items/:categoryId', itemController.getItemsByCategory);

module.exports = router; 