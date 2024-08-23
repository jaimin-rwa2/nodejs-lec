const jwt = require("jsonwebtoken")


const authToken = (req, res, next) => {
    try {
        const token = req.header('Authorization').split(" ")[1]
        let verification = null;
        verification = jwt.verify(token, "asdf@1234")
        req.token = token
        next();
    } catch (error) {
        res.json({
            msg: "token is not valid"
        })
    }
}


module.exports = { authToken };