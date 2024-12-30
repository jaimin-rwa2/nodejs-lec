const mongoose = require('mongoose')



const userSchema = new mongoose.Schema({
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


userSchema.virtual('id').get(function () {
    return this._id.toString(); // or this._id.valueOf() for a number
});

const User = mongoose.model('User', userSchema)

module.exports = { User }