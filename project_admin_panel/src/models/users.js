const { name } = require("ejs")
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        }
    },
    {
        timeseries: true
    }
)


module.exports = mongoose.model("User", userSchema);