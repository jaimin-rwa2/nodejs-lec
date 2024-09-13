const express = require('express')
const mongoose = require('mongoose')
const session = require("express-session")
require('dotenv').config()
const { movieRoutes } = require('./src/routes/movie')
const { userRouter } = require('./src/routes/user')
const { sendEmail } = require('./src/config/email_config')
const { OTP_DATA } = require('./src/config/email_temps')



const app = express()

app.use(express.json())
app.use(session({
    secret: "thisissessionsecurekey"
}))
app.use('/movie/img', express.static('src/imgs'));
app.use('/movie', movieRoutes);
app.use('/user', userRouter);
app.get('/email', (req, res) => {

    const to = req.body["email"]
    let subject = OTP_DATA["OTP_SUBJECT"];
    let msg = OTP_DATA["OTP_TEXT"];
    let html_1 = OTP_DATA["OTP_HTML_1"];
    let html_2 = OTP_DATA["OTP_HTML_2"];

    let otp = Math.round(Math.random() * 100000);
    let html = `${html_1} ${otp} ${html_2}`

    sendEmail(to, subject, msg, html)

    res.json({
        msg: "otp send"
    })
})


app.listen(process.env.PORT, async () => {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('DB Connected');
    console.log(`server is running on http://${process.env.HOST}:${process.env.PORT}/}`)
})