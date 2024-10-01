const { Movie } = require('../models/movie');
const { User } = require('../models/user');
const fs = require('fs')
const path = require('path')




const createMovie = async (req, res) => {

    const req_body = req.body;
    console.log(req.file)
    const poster = req.file['filename'];
    const movieName = req_body['movie'];
    const director = req_body['director'];
    const user = req.user["id"]
    console.log(user)

    await Movie.create({ movieName, director, poster, user });

    res.json({
        msg: "data created"
    })


}


const getMovies = async (req, res) => {

    const page = Number(req.query["page"]) || 1;
    const dataLimit = Number(req.query["limit"]) || 2;
    const skipCount = (page - 1) * dataLimit;
    const totalData = await Movie.countDocuments()
    const totalPages = Math.ceil(totalData / dataLimit)

    const movies = await Movie.find().skip(skipCount).limit(dataLimit);
    res.json({
        page: page,
        limit: dataLimit,
        total: totalData,
        movies: movies,
        totalPages: totalPages
    })
}

const getMovie = async (req, res) => {

    const id = req.params["id"];
    const user_id = req.user["id"]
    const movies = await Movie.findOne({ _id: id, user: user_id }).populate({ path: 'user', select: 'username' });

    res.json({
        movies: movies,
    })
}

const getMovieByUser = async (req, res) => {

    const id = req.user["id"]
    const movies = await Movie.find({ user: id }).populate('user').exec();
    res.json({
        movies: movies,
    })
}




const deleteMovies = async (req, res) => {
    const id = req.params['id']
    const movie = await Movie.findOne({ _id: id })
    if (movie) {

        const poster = movie.poster;
        const poster_path = path.join(__dirname, '../imgs', poster)
        // if (fs.existsSync(poster_path)){
        // }
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



module.exports = { createMovie, getMovie, getMovies, deleteMovies, updateMovie, getMovieByUser }