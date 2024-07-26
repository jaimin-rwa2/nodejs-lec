const express = require('express')
const { getApi } = require('../controllers/books')


const routes = express.Router()




routes.get('/', getApi)


module.exports = { routes };