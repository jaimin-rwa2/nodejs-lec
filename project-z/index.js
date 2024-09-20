require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")

const { userRoute } = require("./src/routes/users")

const app = express()
const PORT = process.env.PORT;

app.use(express.json())


app.get("/test", (req, res) => {
    res.json({
        msg: "server is working"
    }).status(200)
})
app.use("/user", userRoute)


app.listen(PORT, () => {
    mongoose.connect(process.env.MONGO_URL)
    console.log("db connected");

    console.log(`server stared on http://localhost:${PORT}/`);
})