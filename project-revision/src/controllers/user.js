const { User } = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { sendEmail } = require('../config/email_config')
const { OTP_DATA } = require('../config/email_temps')


const salt = bcrypt.genSaltSync(10)


/** POST: user/register
        * @param :  {
            "username": "",
            "password": "",
            "email": "",
            "firstname": "",
            "lastname": "",
            "mobile": "",
            "address": "",
            "profile": "",
        }
    */
const userRegister = async (req, res) => {
    try {
        const startTime = new Date();
        const { username, password, email, profilePic } = req.body;

        // Add Email Authentication Here.

        if (!username || !password || !email) return res.status(400).json({ msg: "Username, Password email are required." })


        const { usernameExist, emailExist } = Promise.all([
            // error handol here
            User.findOne({ username: username }).exist,
            User.findOne({ email: email }).exist
        ])
        // const usernameExist = await User.findOne({ username: username }).exist
        // const emailExist = await User.findOne({ email: email }).exist


        if (usernameExist) {
            res.json({
                "msg": "this username is allready exist"
            })
        }

        if (emailExist) {
            res.json({
                "msg": "this email is allready exist"
            })
        }

        const hashPassword = bcrypt.hashSync(password, salt)
        await User.create({ username: username, password: hashPassword, email: email })


        const endTime = new Date();
        console.log('Time with Promise.all:', endTime - startTime, 'ms');
        res.status(201).json({
            "msg": "user created succesfully"
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({ "msg": "error creating user" })
    }
}

const userLogin = async (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) return res.status(400).json({ msg: "Username and Password are required." })

    const user = await User.findOne({ username: username })

    if (!user) return res.status(401).json({ msg: "User not found" })

    const passOk = bcrypt.compareSync(password, user.password)

    if (passOk) {
        const tokenData = { id: user["_id"], username: user["username"] }
        const accessToken = jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5m" })
        const refreshToken = jwt.sign(tokenData, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" })
        res.cookie("jwt", refreshToken, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 })
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


const userRefreshToken = async (req, res) => {

    const cookies = req.cookies

    if (!cookies?.jwt) return res.status(401).json({ msg: "Refresh Token Expired or not found" })

    const refreshToken = cookies.jwt;
    const refreshTokenData = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

    const user = await User.findOne({ _id: refreshTokenData["id"] })

    if (!user) return res.status(401).json({ msg: "User not found" })


    if (user.username !== tokenData.username) return res.status(403).json({ msg: "Refresh Token is invalid" })

    const tokenData = { id: user["_id"], username: user["username"] }
    const accessToken = jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5m" })
    res.json({
        "msg": "login succesfully",
        accessToken: accessToken
    })
}


const otp_data = {}

const generateOTP = async (req, res) => {
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

    if (old_password === new_password) {
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

const userLogout = async (req, res) => {
    const cookies = req.cookies

    if (!cookies?.jwt) return res.status(204).json({ msg: "Refresh Token not found" })
    res.clearCookie("jwt", { httpOnly: true, secure: true });
    res.json({
        msg: "user logged out successfully"
    })
}


const getUsers = async (req, res) => {

    const users = await User.find()

    res.json({ "users": users })

}

module.exports = { userRegister, userLogin, userForgotPassword, userResetPassword, generateOTP, userLogout, getUsers, userRefreshToken }


