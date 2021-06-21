"use strict";

const express = require('express');
const router = express.Router();

const {
    index,
    findOne,
    create
} = require('../controllers/person');

router.route('/')
    .get(index)
    .post(create);

router.route('/:personId')
    .get(findOne);

module.exports = router;