const { User } = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { sendEmail } = require('../config/email_config')
const { OTP_DATA } = require('../config/email_temps')


const salt = bcrypt.genSaltSync(10)

const userRegister = async (req, res) => {

    const {username, password} = req.body;

    // Add Email Authentication Here.

    if(!username || !password) return res.status(400).json({msg: "Username and Password are required."})

    const hashPassword = bcrypt.hashSync(password, salt)
    const userExist = await User.findOne({ username: username }).exist()

    if (userExist) {
        res.json({
            "msg": "this user name is allready exist"
        })
    }

    await User.create({ username: username, password: hashPassword })

    res.status(201).json({
        "msg": "user created succesfully"
    })

}

const userLogin = async (req, res) => {

    const {username, password} = req.body;

    if(!username || !password) return res.status(400).json({msg: "Username and Password are required."})

    const user = await User.findOne({ username: username })

    if(!user) return res.status(401).json({msg: "User not found"})

    const passOk = bcrypt.compareSync(password, user.password)

    if (passOk) {
        const tokenData = { id: userData["_id"] }
        const accessToken = jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5m" })
        const refreshToken = jwt.sign(tokenData, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" })
        res.cookie("jwt", refreshToken, {httpOnly: true, maxAge: 24*60*60*1000})
        res.json({
            "msg": "login succesfully",
            accessToken: accessToken
        })
    } else {
        res.json({
            "msg": "login fail, password or username is wrong"
        })
    }
}


const otp_data = {}

const userOTPForgotPassword = async (req, res) => {
    const to = req.body["email"]
    const username = req.body["username"]

    const user = await User.findOne({ username: username })
    if (!user) {
        res.json({
            msg: "user not found"
        })
    } else {
        let subject = OTP_DATA["OTP_SUBJECT"];
        let msg = OTP_DATA["OTP_TEXT"];
        let html_1 = OTP_DATA["OTP_HTML_1"];
        let html_2 = OTP_DATA["OTP_HTML_2"];

        let otp = Math.round(Math.random() * 100000);

        otp_data[to] = { otp: otp, time: Date.now() };

        let html = `${html_1} ${otp} ${html_2}`

        sendEmail(to, subject, msg, html)

        console.log(otp_data)
        res.json({
            msg: "otp send"
        })
    }
}

const userForgotPassword = async (req, res) => {
    const { username, email, otp, new_password } = req.body;
    console.log(otp_data[email])
    if (!otp_data[email]) {
        res.json({
            msg: "email is wrong"
        })
    } else if (otp_data[email]["otp"] == otp && (Date.now() - otp_data[email]["time"] <= 60000)) {
        delete otp_data[email];

        await User.updateOne({ username: username }, { password: new_password })

        res.json({
            msg: "password updated"
        })
    } else {
        res.json({
            msg: "otp is wrong"
        })
    }


}

const userResetPassword = async (req, res) => {
    const { old_password, new_password } = req.body;
    const id = req.user["id"];

    if (old_password == new_password) {
        res.json({
            msg: "same as previous password"
        })
    }

    const user = await User.findOne({ _id: id })
    if (user.password != old_password) {
        res.json({
            msg: "password auth fail and please renter the password"
        })
    } else {
        await User.updateOne({ _id: id }, { password: new_password })

        res.json({
            msg: "password updated succesfully"
        })
    }


}

const userLogout = (req, res) => {
    res.json({
        msg: "user logged out successfully"
    })
}


const getUsers = async (req, res) => {

    const users = await User.find()

    res.json({ "users": users })

}

module.exports = { userRegister, userLogin, userForgotPassword, userResetPassword, userOTPForgotPassword, userLogout, getUsers }


