const express = require('express')
const { getBooks, getBook, createBook } = require('../controllers/book')


const book_routes = express.Router()


book_routes.get('/', getBooks)
book_routes.get('/:id', getBook)
book_routes.post('/', createBook)


module.exports = { book_routes }