const express = require('express')
const { createMovie, getMovies, deleteMovies, updateMovie } = require('../controllers/movie')
const { multerConfig } = require('../config/multer_config')
const { authToken } = require('../middleware/tokenAuth')


const movieRoutes = express.Router()

movieRoutes.get('/', authToken, getMovies)
movieRoutes.delete('/delete/:id', deleteMovies)   // dynamic url
movieRoutes.post('/create', authToken, multerConfig.single('img'), createMovie)
movieRoutes.put('/update/:id', multerConfig.single('img'), updateMovie)


module.exports = { movieRoutes }