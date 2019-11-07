const db = require('../../database/models/pgModel');

const itemController = {};

itemController.getAllItems = (req, res, next) => {
    const { list_id } = req.params;

    const text = `
        SELECT * FROM items
        WHERE list_id=$1
        ORDER BY placement;
    `;

    const values = [ list_id ]

    db.query(text, values)
        .then(result => {
            res.locals.items = result.rows;
            return next();
        })
        .catch(err => {
            console.log('Error in movieController.getAllItems: ', err);
            return res.sendStatus(500);
        })
};

itemController.createItem = (req, res, next) => {
    const { list_id, data, placement } = req.body;

    if (!list_id) {
        console.log('No list_id given');
        return res.sendStatus(500);
    } else if (!data) {
        return res.status(400).json({
            success: false,
            message: 'Missing data'
        })
    } else if (!placement) {
        console.log('No placement given');
        return res.sendStatus(500);
    }

    const text = `
        INSERT INTO items (list_id, data, placement)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;

    const values = [ list_id, data, placement ];

    db.query(text, values)
        .then(result => {
            res.locals.items = result.rows;
            return next();
        })
        .catch(err => {
            console.log('Error in movieController.createItem: ', err);
            return res.sendStatus(500);
        })
};

itemController.updateItemData = (req, res, next) => {
    const { id, data } = req.body;

    if (!id) {
        console.log('No id given');
        return res.sendStatus(500);
    } else if (!data) {
        return res.status(400).json({
            success: false,
            message: 'Missing data'
        })
    }

    const text = `
        UPDATE items
        SET data=$2
        WHERE _id=$1
        RETURNING *;
    `;

    const values = [ id, data ];

    db.query(text, values)
        .then(result => {
            res.locals.items = result.rows;
            return next();
        })
        .catch(err => {
            console.log('Error in movieController.updateItemData: ', err);
            return res.sendStatus(500);
        })
};

itemController.updateItemOrder = (req, res, next) => {
    const { id, placement } = req.body;

    if (!id) {
        console.log('No id given');
        return res.sendStatus(500);
    } else if (!placement) {
        console.log('No placement given')
        return res.sendStatus(500);
    }

    const text = `
        UPDATE items
        SET placement=$2
        WHERE _id=$1
        RETURNING *;
    `;

    const values = [ id, placement ];

    db.query(text, values)
        .then(result => {
            res.locals.items = result.rows;
            return next();
        })
        .catch(err => {
            console.log('Error in movieController.updateItemOrder: ', err);
            return res.sendStatus(500);
        })
};

itemController.updateItemStatus = (req, res, next) => {
    const { id, completed } = req.body;

    if (!id) {
        console.log('No id given');
        return res.sendStatus(500);
    } else if (completed === undefined) {
        console.log('No status given')
        return res.sendStatus(500);
    }

    const text = `
        UPDATE items
        SET completed=$2
        WHERE _id=$1
        RETURNING *;
    `;

    const values = [ id, completed ];

    db.query(text, values)
        .then(result => {
            res.locals.items = result.rows;
            return next();
        })
        .catch(err => {
            console.log('Error in movieController.updateItemStatus: ', err);
            return res.sendStatus(500);
        })
};

itemController.deleteItem = (req, res, next) => {
    const { id } = req.params;

    const text = `
        DELETE FROM items
        WHERE _id=$1
        RETURNING *;
    `;

    const values = [ id ];

    db.query(text, values)
        .then(result => {
            res.locals.items = result.rows;
            return next();
        })
        .catch(err => {
            console.log('Error in movieController.deleteItem: ', err);
            return res.sendStatus(500);
        })
};

module.exports = itemController;