const mongoose = require('mongoose')



const book_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 4
    },
    discription: String,
    auther: String
}, {
    timestamps: true
})

const Book = mongoose.model('Book', book_schema)

module.exports = { Book }