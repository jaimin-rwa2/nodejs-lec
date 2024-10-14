const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require("express-session")
const LocalStrategy = require('passport-local').Strategy

require('dotenv').config()
// const { movieRoutes } = require('./src/routes/movie')
// const { userRouter } = require('./src/routes/user')
// const { commentRoutes } = require('./src/routes/comments')

const { User } = require("./src/models/user")

const app = express()

app.use(express.json())

app.use(session({
    secret: process.env.SESSION_SECURET_KEY
}))

// order dose matter
app.use(passport.initialize())
app.use(passport.session())

// middle were at passport js
passport.use(new LocalStrategy(
    async function (username, password, done) {
        console.log(username, password)
        const user = await User.findOne({ username: username });
        if (!user) {
            return done(null, false);
        }
        if (!user.passport === password) { return done(null, false); }
        return done(null, user);
    }
));

const isAuthenticated = (req, res, next) => {
    if (req.user) {
        return next()
    }
    return res.json({
        msg: "user is not authenticated"
    })
}

app.get("/test", isAuthenticated, (req, res) => {

    console.log(req.session)
    console.log(req.user)

    res.json({
        msg: "test"
    })
})

app.post('/register',
    async (req, res, done) => {
        const data = req.body;
        const username = data['username'];
        const password = data['password'];

        const user = await User.findOne({ username: username });

        if (user) {
            return res.json({
                msg: "user already exist"
            })
        }

        const created = await User.create({ username, password });
        return done(null, created)
    },
    function (req, res) {
        res.json({
            msg: "user register sucess fully"
        });
    }
);
app.post('/login',
    passport.authenticate('local'),
    function (req, res) {
        res.json({
            msg: "you are logged in"
        });
    }
);

app.post('/logut', (req, res) => {
    req.logout((msg) => {

    });
    res.json({
        msg: "user is looged out"
    })
});

passport.serializeUser((user, done) => {
    if (user) {
        return done(null, user.id)
    }
    return done(null, false)
});
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        return done(null, user)
    } catch (error) {
        return done(null, false)
    }

});


// app.use('/movie/img', express.static('src/imgs'));
// app.use('/movie', movieRoutes);
// app.use('/user', userRouter);
// app.use('/comment', commentRoutes);


app.listen(process.env.PORT, async () => {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('DB Connected');
    console.log(`server is running on http://${process.env.HOST}:${process.env.PORT}/}`)
})