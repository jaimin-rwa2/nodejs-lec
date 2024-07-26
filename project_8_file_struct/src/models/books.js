const mongoose = require('mongoose')


const book_schema = new mongoose.Schema({
    name: String
})


const Book = mongoose.model('Book', book_schema);


module.exports = { Book }