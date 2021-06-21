"use strict";

const express = require('express');
const router = express.Router();

const {
    index,
    findOne,
    create,
    remove
} = require('../controllers/person');

router.route('/')
    .get(index)
    .post(create);

router.route('/:personId')
    .get(findOne)
    .delete(remove);

module.exports = router;