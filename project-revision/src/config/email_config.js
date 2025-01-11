const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    }
)


function sendEmail(to, subject, msg, html) {
    console.log("===============")
    transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to: to,
        subject: subject,
        text: msg,
        html: html
    })
}


module.exports = { sendEmail }
