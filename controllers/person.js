"use strict";

const fs = require('fs');

const {
    InternalError,
    NotFoundError,
    ValidationError
} = require('../helpers/errors');

const FILE_PATH = './storage/person.json';


const index = (req, res) => {
    try {
        var people = fs.readFileSync(FILE_PATH);
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
        var people = fs.readFileSync(FILE_PATH);
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

const create = (req, res) => {
    let {
        name,
        age,
        address
    } = req.body;
    if (!(name && age && address)) throw new ValidationError([
        'all fields are required'
    ]);

    try {
        var people = JSON.parse(fs.readFileSync(FILE_PATH));
    } catch (err) {
        throw new InternalError(err.message);
    }
    
    let lastId = people[people.length-1].id;
    let newPerson = {
        id: lastId + 1,
        name: name,
        age: Number(age),
        address: address
    }
    people.push(newPerson);

    try {
        fs.writeFileSync(FILE_PATH, JSON.stringify(people));
    } catch (err) {
        throw new InternalError(err.message);
    }

    let response = {
        msg: 'success',
        data: newPerson
    };
    res.writeHead(201);
    res.end(JSON.stringify(response));
}

module.exports = {
    index,
    findOne,
    create
};