const express = require('express')
const { createMovie, getMovie, getMovies, deleteMovies, updateMovie, getMovieByUser } = require('../controllers/movie')
const { multerConfig } = require('../config/multer_config')
const { authToken, authSession } = require('../middleware/tokenAuth')


const movieRoutes = express.Router()

// movieRoutes.get('/', authToken, getMovies)
movieRoutes.get('/', authToken, getMovies)
movieRoutes.get('/user', authToken, getMovieByUser)
movieRoutes.delete('/delete/:id', deleteMovies)   // dynamic url
movieRoutes.post('/create', authToken, multerConfig.single('img'), createMovie)
movieRoutes.get('/:id', authToken, getMovie)
movieRoutes.put('/update/:id', multerConfig.single('img'), updateMovie)


module.exports = { movieRoutes }