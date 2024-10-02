const express = require("express")
const { authToken } = require("../middleware/tokenAuth")
const { userRegister, userLogin, userForgotPassword, userResetPassword, userOTPForgotPassword } = require("../controllers/user")


const userRouter = express.Router()


userRouter.post('/register', userRegister);
userRouter.post('/login', userLogin);
userRouter.post('/forgot_password', userForgotPassword);
userRouter.post('/forgot_password/otp', userOTPForgotPassword);
userRouter.post('/reset_password', authToken, userResetPassword);


module.exports = { userRouter };

