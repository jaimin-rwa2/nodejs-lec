const express = require("express")
const { userRegister, userLogin, userForgotPassword, userResetPassword } = require("../controllers/user")


const userRouter = express.Router()


userRouter.post('/register', userRegister);
userRouter.post('/login', userLogin);
userRouter.post('/forgot_password', userForgotPassword);
userRouter.post('/reset_password', userResetPassword);


module.exports = { userRouter };

