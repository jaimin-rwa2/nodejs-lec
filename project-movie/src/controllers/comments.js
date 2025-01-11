const { Comments } = require("../models/comments")
const { Movie } = require("../models/movie")


const createComment = async (req, res) => {

    const user_id = req.user["id"]
    const movie_id = req.params["movie_id"]

    const { comment, rating } = req.body;

    console.log(req.body)

    const comment_query = await Comments.create({ comment: comment, rating: rating, user: user_id, movie: movie_id })
    await Movie.updateOne({ _id: movie_id }, { $push: { comments: comment_query._id } })

    console.log(comment_query)

    res.status(201).json({
        msg: "comment crated"
    })

}


module.exports = { createComment }