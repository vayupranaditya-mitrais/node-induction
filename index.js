const http = require('http');
const fs = require('fs');
const port = 8000;

const setGlobalHeaders = (res) => {
    res.setHeader('Content-Type', 'application/json');
};

const errResponse = (res, status, msg) => {
    res.writeHead(status);
    res.end(JSON.stringify({
        err: msg
    }));
}

const sendFile = (req, res) => {
    try {
        foods = fs.readFileSync('./assets/foods.json');
        res.writeHead(200);
        res.end(foods.toString());
    } catch (err) {
        console.error(err);
        return errResponse(res, 500, 'internal_err');
    }
    return null;
}

const routes = {
    '/': {
        get: sendFile
    }
}

const route = (req, res) => {
    let uriPath = req.url.toLowerCase();
    let uriRoute = routes[uriPath];
    if (!uriRoute) return errResponse(res, 404, 'not_found');

    let method = req.method.toLowerCase();
    let handler = routes[uriPath][method];
    if (!handler) return errResponse(res, 405, 'method_not_allowed');

    return handler(req, res);
}

http.createServer((req, res) => {
    setGlobalHeaders(res);
    route(req, res)
})
.listen(port);