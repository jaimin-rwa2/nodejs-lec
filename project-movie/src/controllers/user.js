const { User } = require('../models/user');
const jwt = require('jsonwebtoken')



const userRegister = async (req, res) => {
    const data = req.body;
    const username = data['username'];
    const password = data['password'];

    await User.create({ username, password });

    res.json({
        msg: "user created"
    })

}


const userLogin = async (req, res) => {

    const data = req.body;

    const username = data["username"]
    const password = data["password"]

    const userData = await User.findOne({ username, password })

    if (userData) {
        const tokenData = { id: userData["_id"] }
        const token = jwt.sign(tokenData, "asdf@1234", { expiresIn: "10m" })

        // req.session.user = { id: userData["_id"], username: userData["username"] }

        res.json({
            msg: "loggin success",
            token: token
        })
    } else {
        res.json({
            msg: "phone rakh"
        })
    }

}

const userForgotPassword = (req, res) => {

}

const userResetPassword = (req, res) => {

}


module.exports = { userRegister, userLogin, userForgotPassword, userResetPassword }