const { User } = require('../models/user')


const registerUser = async (req, res) => {

    req_body = req.body;
    const username = req_body.username;
    const password = req_body.password;

    await User.create({ username: username, password: password })

    res.json({
        "msg": "user created succesfully"
    })

}

const loginUser = async (req, res) => {

    req_body = req.body;
    const username = req_body.username;
    const password = req_body.password;

    const user_data = await User.findOne({ username: username, password: password })

    if (user_data) {
        res.cookie("login", user_data.username);
        res.json({
            "msg": "login succesfully"
        })
    } else {
        res.json({
            "msg": "login fail, password or username is wrong"
        })
    }



}


const getUsers = async (req, res) => {

    const users = await User.find()

    res.json({ "users": users })

}


module.exports = { registerUser, getUsers, loginUser }