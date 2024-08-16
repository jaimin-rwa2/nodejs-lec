const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const { movieRoutes } = require('./src/routes/movie')
const { sendEmail } = require('./src/config/email_config')



const app = express()

app.use(express.json())
app.use('/movie/img', express.static('src/imgs'))
app.use('/movie', movieRoutes)
app.get('/email', (req, res) => {

    const to = req.body["email"]
    let subject = "default"
    let msg = "default"

    sendEmail(to, subject, msg)
})


app.listen(process.env.PORT, async () => {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('DB Connected');
    console.log(`server is running on http://${process.env.HOST}:${process.env.PORT}/}`)
})