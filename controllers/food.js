"use strict";

const fs = require('fs');

const {InternalError} = require('../helpers/errors');

const index = (req, res) => {
    try {
        let foods = fs.readFileSync('./storage/foods.json');
        res.writeHead(200);
        res.end(foods.toString());
    } catch (err) {
        throw new InternalError(err);
    }
    return null;
}

module.exports = {
    index
};