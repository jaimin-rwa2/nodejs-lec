const mongoose = require('mongoose')


const movieSchema = new mongoose.Schema({
    movieName: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    poster: String
})


const Movie = mongoose.model('Movie', movieSchema);


module.exports = { Movie }