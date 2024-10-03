const mongoose = require('mongoose')


const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie"
    }
}, {
    timestamps: true
})


const Comments = mongoose.model('Comment', commentSchema);


module.exports = { Comments }