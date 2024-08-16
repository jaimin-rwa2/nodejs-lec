const nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport');


const transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth: {
            user: "rwa2.jaimin.jb@gmail.com",
            pass: "qptaxkzgczwcxerr"
        }
    }
)


function sendEmail(to, subject, msg) {
    console.log("===============")
    transporter.sendMail({
        from: "rwa2.jaimin.jb@gmail.com",
        to: to,
        subject: subject,
        text: msg
    })
}


module.exports = { sendEmail }
