"use strict";

const fs = require('fs');

const {
    InternalError,
    NotFoundError,
    ValidationError
} = require('../helpers/errors');


const index = (req, res) => {
    try {
        var people = fs.readFileSync('./storage/person.json');
    } catch (err) {
        throw new InternalError(err.message);
    }

    let response = {
        people: JSON.parse(people)
    };

    res.writeHead(200);
    res.end(JSON.stringify(response));
};

const findById = (personId, people) => {
    for (let i = 0; i < people.length; i++) {
        const person = people[i];
        if (personId === person.id) return person;
    }
};

const findOne = (req, res) => {
    try {
        var people = fs.readFileSync('./storage/person.json');
    } catch (err) {
        throw new InternalError(err.message);
    }

    let personId = Number(req.params.personId);
    if (!personId) throw new ValidationError([
        'personId should be int'
    ]);

    let person = findById(personId, JSON.parse(people));
    if (!person) {
        throw new NotFoundError('', 'no_entity');
    }

    res.writeHead(200);
    res.end(JSON.stringify(person));
};

module.exports = {
    index,
    findOne
};