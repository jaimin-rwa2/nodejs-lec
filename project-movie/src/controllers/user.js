const { User } = require('../models/user');
const jwt = require('jsonwebtoken')
const { sendEmail } = require('../config/email_config')
const { OTP_DATA } = require('../config/email_temps')



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


module.exports = { userRegister, userLogin, userForgotPassword, userResetPassword, userOTPForgotPassword }