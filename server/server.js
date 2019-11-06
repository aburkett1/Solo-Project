const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
// const listController = require('./controllers/listController');

// Require Routers
const routerList = require('./routers/listRouter');
const routerItems = require('./routers/itemRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add Routers Here
app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));
})

app.use('/lists', routerList);


// // Get All Lists
// app.get('/lists', listController.getAllLists, (req, res) => {
//     res.status(200).json(res.locals.lists);
// })

// // Get Specific List
// app.get('/lists/:id', listController.getOneList, (req, res) => {
//     res.status(200).json(res.locals.lists);
// })

// // Create List
// app.post('/lists', listController.createList, (req, res) => {
//     res.status(200).json(res.locals.lists);
// })

// // Update List Name
// app.put('/lists/name', listController.updateListName, (req, res) => {
//     res.status(200).json(res.locals.lists);
// })

// // Update List Order
// app.put('/lists/order', listController.updateListOrder, (req, res) => {
//     res.status(200).json(res.locals.lists);
// })

// // Delete List
// app.delete('/lists/:id', listController.deleteList, (req, res) => {
//     res.status(200).json(res.locals.lists);
// })

// 404 handler
app.use('*', (req, res) => {
    res.sendStatus(404);
});

// global error handler
app.use((err, req, res, next) => {
    console.log(err);
    res.sendStatus(500);
});

app.listen(PORT, ()=>console.log(`listening on port ${PORT}...`));