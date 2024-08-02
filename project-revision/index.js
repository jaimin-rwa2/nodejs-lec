const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cookieParse = require('cookie-parser')
const { book_routes } = require('./src/routes/book')
const { user_routes } = require('./src/routes/user')



const app = express()
dotenv.config()
app.use(express.json())
app.use(cookieParse())
app.use('/book', book_routes)
app.use('/user', user_routes)

app.get('/set', (req, res) => {

    const time = "data with time 2"
    res.cookie('data2', time, { maxAge: 10000 });

    res.json({
        msg: "my server is running"
    })
})

app.get('/get', (req, res) => {
    res.json({
        msg: req.cookies
    })
})




app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.MONGO_URL)
    console.log(`server started at http://localhost:${process.env.PORT}/`)
})