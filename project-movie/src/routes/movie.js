const express = require('express')
const { createMovie, getMovies, deleteMovies } = require('../controllers/movie')
const { multerConfig } = require('../config/multer_config')


const movieRoutes = express.Router()

movieRoutes.get('/', getMovies)
movieRoutes.delete('/delete/:id', deleteMovies)   // dynamic url
movieRoutes.post('/create', multerConfig.single('img'), createMovie)


module.exports = { movieRoutes }