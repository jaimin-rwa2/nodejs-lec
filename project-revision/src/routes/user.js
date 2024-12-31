const express = require('express')
const { authToken } = require("../middleware/tokenAuth")
const { userRegister, userLogin, userForgotPassword, userResetPassword, userOTPForgotPassword, userLogout, getUsers, userRefreshToken } = require("../controllers/user")


const route = express.Router()

route.get('/', getUsers)
route.post('/register', userRegister)
route.get('/login', userLogin)
route.post('/logout', userLogout);
route.post('/forgot_password', userForgotPassword);
route.post('/forgot_password/otp', userOTPForgotPassword);
route.post('/reset_password', authToken, userResetPassword);
route.post('/refresh', userRefreshToken);



module.exports = route;