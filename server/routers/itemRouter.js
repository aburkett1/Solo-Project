const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Get All Items
router.get('/:list_id', itemController.getAllItems, (req, res) => {
    res.status(200).json(res.locals.items);
})

// Create Item
router.post('/', itemController.createItem, (req, res) => {
    res.status(200).json(res.locals.items);
})

// Update Item Data
router.put('/data', itemController.updateItemData, (req, res) => {
    res.status(200).json(res.locals.items);
})

// Update Item Order
router.put('/order', itemController.updateItemOrder, (req, res) => {
    res.status(200).json(res.locals.items);
})

// Update Item Status
router.put('/status', itemController.updateItemStatus, (req, res) => {
    res.status(200).json(res.locals.items);
})

// Delete Item
router.delete('/:id', itemController.deleteItem, (req, res) => {
    res.status(200).json(res.locals.items);
})

// 404 handler
router.use('*', (req, res) => {
    res.sendStatus(404);
});

module.exports = router;