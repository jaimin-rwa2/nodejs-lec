const jwt = require("jsonwebtoken")


const authToken = (req, res, next) => {


    next();
}


module.exports = { authToken };