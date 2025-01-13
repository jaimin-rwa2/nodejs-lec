const { User } = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { sendEmail } = require('../config/email_config')
const { OTP_DATA } = require('../config/email_temps')


const salt = bcrypt.genSaltSync(10)


/** POST: user/register
        * @param :  {
            "username": "",
            "password": "",
            "email": "",
            "firstname": "",
            "lastname": "",
            "mobile": "",
            "address": "",
            "profile": "",
        }
    */
const userRegister = async (req, res) => {
    try {
        const startTime = new Date();
        const { username, password, email } = req.body;

        // Add Email Authentication Here.

        if (!username || !password || !email) return res.status(400).json({ msg: "Username, Password email are required." })

        // const { usernameExist, emailExist } = await Promise.all([
        //     // error handol here
        //     await User.exists({ username: username }),
        //     await User.exists({ email: email })
        // ])
        const usernameExist = await User.exists({ username: username });
        const emailExist = await User.exists({ email: email });

        if (usernameExist) {
            return res.json({
                "msg": "this username is allready exist"
            })
        }

        if (emailExist) {
            return res.json({
                "msg": "this email is allready exist"
            })
        }

        let profilePic = "";

        if (req.file && req.file.filename) {
            profilePic = req.file.filename;
        }

        const hashPassword = bcrypt.hashSync(password, salt)
        await User.create({ username: username, password: hashPassword, email: email, profilePic: profilePic })


        const endTime = new Date();
        console.log('Time with Promise.all:', endTime - startTime, 'ms');
        return res.status(201).json({
            "msg": "user created succesfully"
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ "msg": "error creating user" })
    }
}

const userLogin = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        if (!identifier || !password) return res.status(400).json({ msg: "Username or Email and Password are required." })

        const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] })

        if (!user) return res.status(401).json({ msg: "User not found" })

        const passOk = bcrypt.compareSync(password, user.password)

        if (passOk) {
            let username = user["username"];
            const tokenData = { id: user["_id"], username: username }
            const accessToken = jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5m" })
            const refreshToken = jwt.sign(tokenData, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" })
            // also need to set sameSite : 'None', otherwise frontend did not accepts refresh token as cookie
            // and then they say secure must be true
            res.cookie("jwt", refreshToken, { httpOnly: true, sameSite: "None", secure: true, maxAge: 24 * 60 * 60 * 1000 })
            return res.json({
                "msg": "login succesfully",
                accessToken: accessToken,
                username: username
            })
        } else {
            return res.status(500).json({
                "msg": "login fail, password wrong"
            })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            "msg": "Error in user login"
        })
    }
}


const userRefreshToken = async (req, res) => {

    try {
        const cookies = req.cookies

        if (!cookies?.jwt) return res.status(401).json({ msg: "Refresh Token Expired or not found" })

        const refreshToken = cookies.jwt;
        const refreshTokenData = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

        const user = await User.findOne({ _id: refreshTokenData["id"] })

        if (!user) return res.status(401).json({ msg: "User not found" })


        if (user.username !== tokenData.username) return res.status(403).json({ msg: "Refresh Token is invalid" })

        const tokenData = { id: user["_id"], username: user["username"] }
        const accessToken = jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5m" })
        return res.json({
            "msg": "login succesfully",
            accessToken: accessToken
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            "msg": "Error in user refresh token"
        })
    }

}


const otp_data = {}

const generateOTP = async (req, res) => {

    try {
        const to = req.body["email"]
        const username = req.body["username"]

        const user = await User.findOne({ username: username })
        if (!user) {
            return res.json({
                msg: "user not found"
            })
        } else {
            let subject = OTP_DATA["OTP_SUBJECT"];
            let html_1 = OTP_DATA["OTP_HTML_1"];
            let html_2 = OTP_DATA["OTP_HTML_2"];

            let otp = Math.round(Math.random() * 9000);

            otp_data[to] = { otp: otp, time: Date.now() };

            let html = `${html_1} ${otp} ${html_2}`

            sendEmail(to, subject, html)

            console.log(otp_data)
            return res.json({
                msg: "otp send"
            })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            "msg": "Error in generating OTP"
        })
    }
}

const userForgotPassword = async (req, res) => {

    try {
        // verify Email or Username
        const { username, email, otp, new_password } = req.body;
        console.log(otp_data[email])
        if (!otp_data[email]) {
            return res.json({
                msg: "email is wrong"
            })
        } else if (otp_data[email]["otp"] == otp && (Date.now() - otp_data[email]["time"] <= 60000)) {
            delete otp_data[email];

            await User.updateOne({ username: username }, { password: new_password })

            return res.json({
                msg: "password updated"
            })
        } else {
            return res.json({
                msg: "otp is wrong"
            })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            "msg": "Error in Forgot Password"
        })
    }



}

const userResetPassword = async (req, res) => {

    try {
        const { old_password, new_password } = req.body;
        const id = req.user["id"];

        if (old_password === new_password) {
            return res.json({
                msg: "same as previous password"
            })
        }

        const user = await User.findOne({ _id: id })
        if (user.password != old_password) {
            return res.json({
                msg: "password auth fail and please renter the password"
            })
        } else {
            await User.updateOne({ _id: id }, { password: new_password })

            return res.json({
                msg: "password updated succesfully"
            })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            "msg": "Error in ResetPassword"
        })
    }



}

const userLogout = async (req, res) => {
    try {
        const cookies = req.cookies

        if (!cookies?.jwt) return res.status(204).json({ msg: "Refresh Token not found" })
        res.clearCookie("jwt", { httpOnly: true, sameSite: "None",secure: true });
        return res.json({
            msg: "user logged out successfully"
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            "msg": "Error in logout"
        })
    }
}


const getUsers = async (req, res) => {

    try {
        const users = await User.find()

        return res.json({ "users": users })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            "msg": "Error in getting users"
        })
    }
}

const getUser = async (req, res) => {

    try {
        const userId = req.params["userId"]

        const user = await User.findById(userId)

        // const {password, ...restUserData} = user;  // can not pass directly, give us unnecessary response
        const { password, ...restUserData } = Object.assign({}, user.toJSON());

        return res.json({ "user": restUserData })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            "msg": "Error in getting user"
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const user_id = req.params["user_id"]; // 3
        const userBody = req.body;
        const user = await User.findOne({ _id: user_id });

        if (!user) return res.json({ msg: "this user is dose not exist" });


        // this is other way to perform profilePic
        // await User.updateOne({ _id: user_id}, userBody)
        if (userBody["username"]) {
            user["username"] = userBody["username"];
        }

        if (userBody["password"]) {
            user["password"] = userBody["password"];
        }

        if (userBody["email"]) {
            user["email"] = userBody["email"];
        }
        if (userBody["firstName"]) {
            user["firstName"] = userBody["firstName"];
        }

        if (userBody["lastName"]) {
            user["lastName"] = userBody["lastName"];
        }

        if (userBody["mobile"]) {
            user["mobile"] = userBody["mobile"];
        }

        if (userBody["address"]) {
            user["address"] = userBody["address"];
        }

        if (req.file && req.file.filename) {
            const oldFileName = user["profilePic"];

            if (oldFileName !== "") {
                const oldFilePath = path.join(
                    __dirname, "..", "..", "public", "images", "profilePics", oldFileName
                );
                fs.unlinkSync(oldFilePath);
            }

            user["profilePic"] = req.file.filename;
        }

        user.save();

        return res.status(202).json({
            msg: "user updated",
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "internal server error",
            error: error,
        });

    }
};


const deleteUser = async (req, res) => {
    // User self, ADMIN
    try {
        const userId = req.params["user_id"]; // 3

        const singleUser = await User.exists({ _id: userId });

        if (!singleUser) {
            return res.json({
                msg: "this user is dose not exist",
            });
        } else {
            await User.deleteOne({ _id: userId });

            return res.status(202).json({
                msg: "user removed",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "internal server error",
            error: error,
        });
    }
};


module.exports = { userRegister, userLogin, userForgotPassword, userResetPassword, generateOTP, userLogout, getUsers, userRefreshToken }


