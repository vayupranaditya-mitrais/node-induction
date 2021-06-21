"use strict";

class InternalError extends Error {
    constructor(err) {
        super();
        this.status = 500;
        this.logMsg = err.message;
        this.resMsg = 'internal_error';
    }
}

class NotFoundError extends Error {
    constructor(err) {
        super();
        this.status = 404;
        this.logMsg = err.message;
        this.resMsg = 'not_found';
    }
}

module.exports = {
    InternalError,
    NotFoundError
};