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
    timestamps: true,
    versionKey: false
})


book_schema.virtual('id').get(function () {
    return this._id.toString(); // or this._id.valueOf() for a number
});

const Book = mongoose.model('Book', book_schema)

module.exports = { Book }