const express = require('express')
const { authToken } = require("../middleware/tokenAuth")
const { userRegister, userLogin, userForgotPassword, userResetPassword, userOTPForgotPassword, userLogout, getUsers } = require("../controllers/user")


const route = express.Router()

const express = require("express")


route.post('/register', userRegister)
route.get('/', getUsers)
route.get('/login', userLogin)
route.post('/register', userRegister);
route.post('/logout', userLogout);
route.post('/forgot_password', userForgotPassword);
route.post('/forgot_password/otp', userOTPForgotPassword);
route.post('/reset_password', authToken, userResetPassword);


module.exports = route;