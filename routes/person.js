"use strict";

const express = require('express');
const router = express.Router();

const { index } = require('../controllers/person');

router.route('/')
    .get(index)

module.exports = router;