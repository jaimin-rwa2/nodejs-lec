const mongoose = require("mongoose")


const User = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    age: String
})

module.exports = mongoose.model('User', User)  // users