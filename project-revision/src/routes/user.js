const express = require('express')
const { registerUser, getUsers, loginUser } = require('../controllers/user')


const user_routes = express.Router()


user_routes.post('/register', registerUser)
user_routes.get('/', getUsers)
user_routes.get('/login', loginUser)


module.exports = { user_routes }