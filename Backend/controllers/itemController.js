const Item = require('../models/Items.model');

exports.getItemsByCategory = async (req, res) => {
    const categoryId = req.params.categoryId;
    if (!categoryId) {
      return res.status(400).json({ error: 'categoryId is required' });
    }
    try {
      const items = await Item.find({ categoryId }).populate('categoryId');
      console.log(categoryId)
      res.json(items);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch items' });
    }
  };