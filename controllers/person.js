"use strict";

const fs = require('fs');

const {
    InternalError,
    NotFoundError,
    ValidationError
} = require('../helpers/errors');

const FILE_PATH = './storage/person.json';

const matchPattern = (param, field) => {
    if (Number.isInteger(field)) return field == Number(param);
    return field.search(param) != -1;
};

const searchIdx = (param, attrName, people) => {
    let indexes = [];
    for (let i = 0; i < people.length; i++) {
        const person = people[i];
        if (matchPattern(param, person[attrName])) indexes.push(i);
    }
    return indexes;
};

const intersectArrays = (array1, array2) => {
    return array1.filter(element => array2.includes(element));
}

const searchCombination = (params, people) => {
    // Search in every attr specified
    let resultIdx = [];
    let checked = false;
    for (const key in params) {
        if (Object.hasOwnProperty.call(params, key) && params[key]) {
            const param = params[key];
            let attrSearchResult = searchIdx(param, key, people);

            // Apply AND operator to queries
            if (!checked) {
                resultIdx = attrSearchResult;
                checked = true;
            } else {
                resultIdx = intersectArrays(resultIdx, attrSearchResult);
            }
        }
    }

    // Get result from people
    let result = [];
    for (let i = 0; i < resultIdx.length; i++) {
        const idx = resultIdx[i];
        result.push(people[idx]);
    }
    return result;
};

const index = (req, res) => {
    try {
        var people = JSON.parse(fs.readFileSync(FILE_PATH));
    } catch (err) {
        throw new InternalError(err.message);
    }

    if (Object.keys(req.query).length)
        people = searchCombination(req.query, people);

    let response = {
        people: people
    };

    res.writeHead(200);
    res.end(JSON.stringify(response));
};

const getIndex = (personId, people) => {
    for (let i = 0; i < people.length; i++) {
        const person = people[i];
        if (personId === person.id) return i;
    }
};

const findOne = (req, res) => {
    try {
        var people = JSON.parse(fs.readFileSync(FILE_PATH));
    } catch (err) {
        throw new InternalError(err.message);
    }

    let personId = Number(req.params.personId);
    if (!personId) throw new ValidationError([
        'personId should be int'
    ]);

    let person = people[getIndex(personId, people)];
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
};

const remove = (req, res) => {
    try {
        var people = JSON.parse(fs.readFileSync(FILE_PATH));
    } catch (err) {
        throw new InternalError(err.message);
    }

    let personId = Number(req.params.personId);
    if (!personId) throw new ValidationError([
        'personId should be int'
    ]);

    let personIdx = getIndex(personId, people);
    if (!personIdx) {
        throw new NotFoundError('', 'no_entity');
    }

    let deletedPerson = people[personIdx];
    people.splice(personIdx, 1);
    try {
        fs.writeFileSync(FILE_PATH, JSON.stringify(people));
    } catch (err) {
        throw new InternalError(err.message);
    }

    let response = {
        msg: 'success',
        data: deletedPerson
    };
    res.writeHead(201);
    res.end(JSON.stringify(response));
};

module.exports = {
    index,
    findOne,
    create,
    remove
};