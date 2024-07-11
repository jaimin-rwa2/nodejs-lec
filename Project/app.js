const http = require('http');
const url = require('url');


http.createServer(
    (req, res) => {
        const queryObject = url.parse(req.url, true).query;
        console.log(queryObject);
        req.on('data', (chunk) => {
            console.log(`Data chunk available: ${chunk}`)
        })
        res.write("hello world");
        res.end();
    }
).listen("4000")