const express = require('express')
const mongoose = require('mongoose')
const { book_routes } = require('./src/routes/book')



const app = express()

app.use(express.json())
app.use('/book', book_routes)

app.get('/test', (req, res) => {
    res.json({
        msg: "my server is running"
    })
})




app.listen(8000, () => {
    mongoose.connect('mongodb://localhost:27017/books-collection')
    console.log("server started at http://localhost:8000/")
})