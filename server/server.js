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
    res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
})

// Serve build
app.use('/build', express.static(path.join(__dirname, '../build')));

// Serve build
app.use('/assets/snake', express.static(path.join(__dirname, '../client/assets/snake.png')));

// Route to lists
app.use('/lists', routerList);

// Route to items
app.use('/items', routerItems);

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