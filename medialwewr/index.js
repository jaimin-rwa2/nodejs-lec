const express = require('express')


const app = express()

const m1 = (req, res, next) => {
    console.log("m1");
    next();
}

const m2 = (req, res, next) => {
    throw new Error("error in m2 middlewere");
    next();
}

const m3 = (req, res, next) => {
    console.log("m3");
    next();
}

const eh = (error, req, res, next) => {
    console.error(error);
    res.status(501).json({
        "error": String(error)
    })
}


app.use(m1)
app.use(m3)
app.use(m2)
app.use(eh)

app.get('/', (req, res) => {
    console.log("root api hit")
    res.json({ data: "root" })
})
app.listen(8000);