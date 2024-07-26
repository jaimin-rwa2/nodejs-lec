const express = require('express')
const { routes } = require('./src/routes/books')

const app = express()

app.use('/book', routes);

app.listen('8000')