const express = require('express')
const { createComment } = require('../controllers/comments')
const { authToken, authSession } = require('../middleware/tokenAuth')


const commentRoutes = express.Router()

commentRoutes.post('/:movie_id/create', authToken, createComment)


module.exports = { commentRoutes }