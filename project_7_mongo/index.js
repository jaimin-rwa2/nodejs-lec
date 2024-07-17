const express = require("express")
const mongoose = require("mongoose")
const User = require("./model")


const app = express()
app.use(express.json())
app.get('/', async (req, res) => {

    const data = await User.find()
    res.json({ data: data })
})


app.post('/', (req, res) => {
    const req_body = req.body
    const username = req_body["username"]
    const age = req_body["age"]
    User.create({ username: username, age: age })
    res.json({ msg: "post" })
})


app.put('/:id', async (req, res) => {
    const id = req.params['id']
    const req_body = req.body
    const username = req_body["username"]
    await User.findOneAndUpdate({ _id: id }, { username: username })
    res.json({ msg: "put" })
})

app.delete('/:id', async (req, res) => {
    const id = req.params['id']
    await User.deleteOne({ _id: id })
    res.json({ msg: "delete" })
})


app.listen(8000, async () => {
    await mongoose.connect("mongodb://localhost:27017/learn-mongo")
    console.log("db connected")
    console.log('server started on http://localhost:8000/')
})