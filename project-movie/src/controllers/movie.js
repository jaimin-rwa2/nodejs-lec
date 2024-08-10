const { Movie } = require('../models/movie');
const fs = require('fs')
const path = require('path')




const createMovie = async (req, res) => {
    const req_body = req.body;
    const poster = req.file.filename;
    const movieName = req_body['movie'];
    const director = req_body['director'];

    await Movie.create({ movieName, director, poster });

    res.json({
        msg: "data created"
    })

}

const getMovies = async (req, res) => {
    const movies = await Movie.find()
    res.json({
        movies: movies
    })
}



const deleteMovies = async (req, res) => {
    const id = req.params['id']
    const movie = await Movie.findOne({ _id: id })
    if (movie) {

        const poster = movie.poster;
        const poster_path = path.join(__dirname, '../imgs', poster)
        fs.unlinkSync(poster_path)
        await Movie.deleteOne({ _id: id })

        res.json({
            msg: "data removed"
        })
    } else {
        res.json({
            msg: "data not fount"
        })
    }
}

module.exports = { createMovie, getMovies, deleteMovies }