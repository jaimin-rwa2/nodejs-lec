const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const { book_routes } = require('./src/routes/book')



const app = express()
dotenv.config()
app.use(express.json())
app.use('/book', book_routes)

app.get('/test', (req, res) => {
    res.json({
        msg: "my server is running"
    })
})




app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.MONGO_URL)
    console.log(`server started at http://localhost:${process.env.PORT}/`)
})