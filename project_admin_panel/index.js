require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");


const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    saveUninitialized: true,
    resave: true
}))
app.use((req, res, next)=>{
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})

app.set("views", "src/views");
app.set("view engine", "ejs");

app.get("/", (req, res)=>{
    res.render("index")
})
app.get("/add", (req, res)=>{
    res.render("add_user")
})
app.get("/test", (req, res)=>{
    res.json({msg: "server working"});
})


function connect_db(){
    mongoose.connect(process.env.DB_URL);
    const db = mongoose.connection;
    db.on("error", (error) => console.log(error));
    db.once("open", (error) => console.log("DB CONNECTED"));
}

app.listen(PORT, ()=>{
    connect_db();
    console.log(`server started at http://localhost:${PORT}`);
});