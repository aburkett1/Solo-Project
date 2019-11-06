const db = require('../../database/models/listModel');

const listController = {};

listController.getAllLists = (req, res, next) => {
    const text = `
        SELECT * FROM lists;
    `;

    db.query(text)
        .then(data => {
            res.locals.lists = data.rows;
            return next();
        })
        .catch(err => {
            console.log('Error in movieController.getAllLists: ', err);
            return res.sendStatus(500);
        })
};

listController.getOneList = (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'No list provided'
        })
    }

    const text = `
        SELECT * FROM lists
        WHERE _id=$1;
    `;

    const values = [ id ];

    db.query(text, values)
        .then(data => {
            res.locals.lists = data.rows;
            return next();
        })
        .catch(err => {
            console.log('Error in movieController.getOneList: ', err);
            return res.sendStatus(500);
        })
};

listController.createList = (req, res, next) => {
    console.log(req.body);
    const { name, placement } = req.body;

    if (!name) {
        return res.status(400).json({
            success: false,
            message: 'Missing name'
        })
    } else if (!placement) {
        console.log('No placement given');
        return res.sendStatus(500);
    }

    const text = `
        INSERT INTO lists (name, placement)
        VALUES ($1, $2)
        RETURNING *;
    `;

    const values = [ name, placement ];

    db.query(text, values)
        .then(data => {
            res.locals.lists = data.rows;
            return next();
        })
        .catch(err => {
            console.log('Error in movieController.createList: ', err);
            return res.sendStatus(500);
        })
};

listController.updateListName = (req, res, next) => {
    const { id, name } = req.body;

    if (!name) {
        return res.status(400).json({
            success: false,
            message: 'Missing name'
        })
    }

    const text = `
        UPDATE lists
        SET name=$2
        WHERE _id=$1
        RETURNING *;
    `;

    const values = [ id, name ];

    db.query(text, values)
        .then(data => {
            res.locals.lists = data.rows;
            return next();
        })
        .catch(err => {
            console.log('Error in movieController.updateListName: ', err);
            return res.sendStatus(500);
        })
};

listController.updateListOrder = (req, res, next) => {
    const { id, placement } = req.body;

    if (!placement) {
        console.log('No placement given')
        return res.sendStatus(500);
    }

    const text = `
        UPDATE lists
        SET placement=$2
        WHERE _id=$1
        RETURNING *;
    `;

    const values = [ id, placement ];

    db.query(text, values)
        .then(data => {
            res.locals.lists = data.rows;
            return next();
        })
        .catch(err => {
            console.log('Error in movieController.updateListOrder: ', err);
            return res.sendStatus(500);
        })
};

listController.deleteList = (req, res, next) => {
    const { id } = req.params;

    const text = `
        DELETE FROM lists
        WHERE _id=$1
        RETURNING *;
    `;

    const values = [ id ];

    db.query(text, values)
        .then(data => {
            res.locals.lists = data.rows;
            return next();
        })
        .catch(err => {
            console.log('Error in movieController.deleteList: ', err);
            return res.sendStatus(500);
        })
};

module.exports = listController;