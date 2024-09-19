const express = require("express")
require("dotenv").config()


const app = express();
const port = process.env.PORT;

app.set("views", "src/views")
app.set("view engine", "ejs")


app.get('/', (req, res) => {
    res.render("index")
})


app.listen(port, () => {
    console.log(`server started on http://localhost:${port}/`)
})