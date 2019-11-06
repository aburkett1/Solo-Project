const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');

// Get All Lists
router.get('/', listController.getAllLists, (req, res) => {
    res.status(200).json(res.locals.lists);
})

// Get Specific List
router.get('/:id', listController.getOneList, (req, res) => {
    res.status(200).json(res.locals.lists);
})

// Create List
router.post('/', listController.createList, (req, res) => {
    res.status(200).json(res.locals.lists);
})

// Update List Name
router.put('/name', listController.updateListName, (req, res) => {
    res.status(200).json(res.locals.lists);
})

// Update List Order
router.put('/order', listController.updateListOrder, (req, res) => {
    res.status(200).json(res.locals.lists);
})

// Delete List
router.delete('/:id', listController.deleteList, (req, res) => {
    res.status(200).json(res.locals.lists);
})

// 404 handler
router.use('*', (req, res) => {
    res.sendStatus(404);
});

module.exports = router;