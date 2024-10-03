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
    poster: String,
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
})


const Movie = mongoose.model('Movie', movieSchema);


module.exports = { Movie }