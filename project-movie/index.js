const express = require('express')
const mongoose = require('mongoose')
const session = require("express-session")
require('dotenv').config()
const { movieRoutes } = require('./src/routes/movie')
const { userRouter } = require('./src/routes/user')
const { commentRoutes } = require('./src/routes/comments')



const app = express()

app.use(express.json())
app.use(session({
    secret: "thisissessionsecurekey"
}))
app.use('/movie/img', express.static('src/imgs'));
app.use('/movie', movieRoutes);
app.use('/user', userRouter);
app.use('/comment', commentRoutes);


app.listen(process.env.PORT, async () => {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('DB Connected');
    console.log(`server is running on http://${process.env.HOST}:${process.env.PORT}/}`)
})