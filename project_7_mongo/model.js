const mongoose = require("mongoose")


const User = new mongoose.Schema({
    username: {
        type: String
    },
    age: String,
    img: String
})

module.exports = mongoose.model('User', User)  // users