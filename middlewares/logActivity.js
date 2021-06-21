"use strict";

const logActivity = (req, res, next) => {
    let date = new Date();
    let datetime = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    let msg = `${datetime} => [${req.method.toUpperCase()}] ${req.path}`;
    console.log(msg);

    next();
}

module.exports = logActivity;