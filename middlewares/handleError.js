"use strict";

const handleError = (customErr, req, res, next) => {
    if (customErr.logMsg) console.error(customErr.logMsg);
    res.writeHead(customErr.status);
    res.end(JSON.stringify({
        err: customErr.responseMsg
    }));
}

module.exports = handleError;