const { User } = require('../models/user')
const bcrypt = require('bcrypt')


const salt = bcrypt.genSaltSync(10)

// console.log(iPassword)
// const passOk = await bcrypt.compareSync(password, iPassword)
// console.log(passOk)

const registerUser = async (req, res) => {

    req_body = req.body;
    const username = req_body.username;
    const password = req_body.password;

    const iPassword = await bcrypt.hashSync(password, salt)

    await User.create({ username: username, password: iPassword })

    res.json({
        "msg": "user created succesfully"
    })

}

const loginUser = async (req, res) => {

    req_body = req.body;
    const username = req_body.username;
    const password = req_body.password;



    const user_data = await User.findOne({ username: username })
    const passOk = bcrypt.compareSync(password, user_data.password)

    if (passOk) {
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