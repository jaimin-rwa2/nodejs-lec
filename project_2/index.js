const http = require("http");

http.createServer(
    (req, res) => {
        res.write("test http");
        res.end()
    }
).listen("8001")