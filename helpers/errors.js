"use strict";

class InternalError extends Error {
    constructor(logMsg) {
        super();
        this.status = 500;
        this.logMsg = logMsg;
        this.responseMsg = 'internal_error';
    }
}

class NotFoundError extends Error {
    constructor(logMsg, responseMsg) {
        super();
        this.status = 404;
        this.logMsg = logMsg;
        this.responseMsg = responseMsg;
    }
}

class ValidationError extends Error {
    constructor(responseMsgs) {
        super();
        this.status = 422;
        this.logMsg = null;
        this.responseMsg = responseMsgs;
    }
}

module.exports = {
    InternalError,
    NotFoundError,
    ValidationError
};