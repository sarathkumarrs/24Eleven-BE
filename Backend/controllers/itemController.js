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

exports.createItem = async (req, res) => {
  try {
    const { name, price, image, categoryId, description, stock_quantity, discount_limit, cashback_percentage, cashback_limit } = req.body;
    const item = new Item({ name, price, image, categoryId, description, stock_quantity, discount_limit, cashback_percentage, cashback_limit });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create item', details: err.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const item = await Item.findByIdAndUpdate(id, updateData, { new: true });
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update item', details: err.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findByIdAndDelete(id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete item', details: err.message });
  }
};