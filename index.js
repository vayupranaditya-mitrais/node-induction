"use strict";

// App related
const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT;

// Middlewares
app.use(require('./middlewares/setGlobalHeaders'));
app.use(require('./middlewares/logActivity'));

// Sub App routes
app.use('/food', require('./routes/food'));
app.use('/person', require('./routes/person'));

// Handle 404
const {_, NotFoundError} = require('./helpers/errors');
app.all('*', (req, res) => {
    throw new NotFoundError('', 'url_not_found');
});

// Error middlewares
const handleError = require('./middlewares/handleError');
app.use(handleError);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
