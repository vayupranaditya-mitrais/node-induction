"use strict";

const fs = require('fs');

const {InternalError} = require('../helpers/errors');


const index = (req, res) => {
    try {
        var people = fs.readFileSync('./storage/person.json');
    } catch (err) {
        throw new InternalError(err);
    }

    let response = {
        people: JSON.parse(people)
    };

    res.writeHead(200);
    res.end(JSON.stringify(response));
}

module.exports = {
    index
};