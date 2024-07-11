const express = require("express")


const app = express()

app.use(express.json())   // body data get   // miiddle where


app.get('/', function (req, res) {

    console.log(req.query)
    console.log(req.params)
    console.log(req.body)

    res.json({
        "data": {
            "name": "jaimin"
        }
    })
})




// app.post('/', function (req, res) {

//     console.log(req.body)

//     res.send("post req")
// })

app.listen(8000)