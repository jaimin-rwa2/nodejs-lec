const jwt = require("jsonwebtoken")


const authToken = (req, res, next) => {
    try {
        // req.headers["Authorization"] ???
        const authorization = req.header('Authorization')
        if (!authorization?.startsWith('Bearer ')) return res.status(401).json({msg: "Invalid authorization"})
        const token = req.header('Authorization').split(" ")[1]
        req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        next();
    } catch (error) {
        res.status(401).json({
            msg: "token is not valid"
        })
    }
}

module.exports = { authToken };