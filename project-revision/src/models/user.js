const mongoose = require('mongoose')



const user_schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
}, {
    timestamps: true,
    versionKey: false
})


user_schema.virtual('id').get(function () {
    return this._id.toString(); // or this._id.valueOf() for a number
});

const User = mongoose.model('User', user_schema)

module.exports = { User }