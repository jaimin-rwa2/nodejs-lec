const jwt = require("jsonwebtoken")


const authToken = (req, res, next) => {
    try {
        const token = req.header('Authorization').split(" ")[1]
        let verification = null;
        verification = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        req.user = { id: verification["id"] }

        req.token = token
        next();
    } catch (error) {
        res.status(401).json({
            msg: "token is not valid"
        })
    }
}

module.exports = { authToken };