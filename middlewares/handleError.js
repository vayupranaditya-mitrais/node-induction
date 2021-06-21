"use strict";

const handleError = (customErr, req, res, next) => {
    try {
        if (customErr.logMsg) console.error(customErr.logMsg);
        res.writeHead(customErr.status);
        res.end(JSON.stringify({
            err: customErr.responseMsg
        }));
    } catch (err) {
        console.error(customErr);
        console.error(err);
        res.writeHead(500);
        res.end(JSON.stringify({
            err: 'internal_err'
        }));
    }
}

module.exports = handleError;