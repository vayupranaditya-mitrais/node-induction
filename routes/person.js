"use strict";

const express = require('express');
const router = express.Router();

const {
    index,
    findOne
} = require('../controllers/person');

router.route('/')
    .get(index);

router.route('/:personId')
    .get(findOne);

module.exports = router;