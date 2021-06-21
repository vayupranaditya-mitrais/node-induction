"use strict";

const handleError = (customErr, req, res, next) => {
    console.error(customErr.logMsg);
    res.writeHead(customErr.status);
    res.end(JSON.stringify({
        err: customErr.resMsg
    }));
}

module.exports = handleError;