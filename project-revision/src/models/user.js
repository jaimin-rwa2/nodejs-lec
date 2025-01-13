const mongoose = require('mongoose')
const ROLES_LIST = require('../config/roles_list')



const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide unique Username"],
        unique: [true, "Username Exist"]
    },
    password: {
        type: String,
        required: [true, "Please provide a Password"],
        unique: false
    },
    email: {
        type: String,
        required: [true, "Please provide a unique and valid Email"],
        unique: [true, "Email Exist"],
        match: [/\S+@\S+\.\S+/, 'Invalid email format']
    },
    firstName: String,
    lastName: String,
    mobile: Number,
    address: String,
    profilePic: {
        type: String, 
        default: ''
    },
    roles: {
        type: [Number], 
        enum: [ROLES_LIST.admin, ROLES_LIST.editor, ROLES_LIST.user],
        default: [ROLES_LIST.user]
    }
}, {      
    timestamps: true,
    versionKey: false
})


userSchema.virtual('id').get(function () {
    return this._id.toString(); // or this._id.valueOf() for a number
});

const User = mongoose.model('User', userSchema)

module.exports = { User }