equire('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParse = require('cookie-parser')
const errorHandler =require("./src/middlewares/errorHandler")

const app = express()
app.use(express.json())
app.use(cookieParse())
// app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, "public")))

app.use('/user', require('./src/routes/user'))

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

app.all("*", (req, res)=>{
    res.status(404).json({
            error: "404 not found"
        });
})

app.use(errorHandler)


app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.MONGO_URL)
    console.log('DB Connected');
    console.log(`server is running on http://${process.env.HOST}:${process.env.PORT}/}`)
})