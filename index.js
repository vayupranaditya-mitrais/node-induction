"use strict";

// App related
const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT;

// Middlewares
const setGlobalHeaders = require('./middlewares/setGlobalHeaders');
app.use(setGlobalHeaders);

// Sub App routes
app.use('/food', require('./routes/food'));
app.use('/person', require('./routes/person'));

// Handle 404
const {_, NotFoundError} = require('./helpers/errors');
app.all('*', (req, res) => {
    throw new NotFoundError(new Error());
});

// Error middlewares
const handleError = require('./middlewares/handleError');
app.use(handleError);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
