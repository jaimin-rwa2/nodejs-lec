const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 4,
        maxlength: 15,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: /.+\@.+\..+/
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 20
    }
}, {
    timestamps: true
})


const User = mongoose.model("User", userSchema)


module.exports = { User }

