const { User } = require("../models/users")


const registerUser = async (req, res) => {

    try {
        const data = req.body;

        await User.create({
            username: data.username,
            email: data.email,
            password: data.password
        })


        res.status(201).json(
            {
                msg: "user created success fully"
            }
        )
    } catch (error) {
        res.status(503).json({
            msg: "internal sever error",
            error: error
        })
    }

}


module.exports = { registerUser }