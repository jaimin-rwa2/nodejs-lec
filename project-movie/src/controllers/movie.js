const { Movie } = require('../models/movie');
const fs = require('fs')
const path = require('path')




const createMovie = async (req, res) => {
    const req_body = req.body;
    const poster = req.file["filename"];
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

const updateMovie = async (req, res) => {
    const id = req.params['id']
    const req_body = req.body
    console.log(req_body)
    const movie = await Movie.findOne({ _id: id })
    if (movie) {

        let poster = null;
        let movieName = null;
        let director = null;

        if (req["file"] && req.file["filename"]) {
            poster = movie.poster;
            const poster_path = path.join(__dirname, '../imgs', poster)
            fs.unlinkSync(poster_path)
            poster = req.file["filename"];
        } else {
            poster = movie.poster;
        }

        if (req_body["movie"]) {
            movieName = req_body['movie'];
        } else {
            movieName = movie.movieName;
        }


        if (req_body["director"]) {
            director = req_body['director'];
        } else {
            director = movie.director;
        }


        await Movie.updateOne({ _id: id }, { movieName: movieName, director: director, poster: poster })


        res.json({
            msg: "data updated"
        })
    } else {
        res.json({
            msg: "data not fount"
        })
    }
}



module.exports = { createMovie, getMovies, deleteMovies, updateMovie }