const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth: {
            user: "rwa2.jaimin.jb@gmail.com",
            pass: "yqah sioz htii zzqb"
        }
    }
)


function sendEmail(to, subject, msg, html) {
    console.log("===============")
    transporter.sendMail({
        from: "rwa2.jaimin.jb@gmail.com",
        to: to,
        subject: subject,
        text: msg,
        html: html
    })
}


module.exports = { sendEmail }
