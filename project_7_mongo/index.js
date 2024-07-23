const express = require("express")
const mongoose = require("mongoose")
const multer = require("multer")

const User = require("./model")


const app = express()



app.use(express.json())


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 100000)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })


app.get('/', async (req, res) => {

    const data = await User.find()
    res.json({ data: data })
})


app.post('/', upload.single('img'), (req, res) => {
    const req_body = req.body
    console.log(req.body)
    const username = req_body["username"]
    const age = req_body["age"]
    let img_link = ''

    if (req.file) {
        img_link = 'http://localhost:8000/uploads/' + req.file.filename
    }
    console.log(img_link)
    User.create({ username: username, age: age, img: img_link })
    res.json({ msg: "post" })
})

app.post('/upload', upload.single('img'), (req, res) => {
    console.log(req.file)
    console.log(req.file.filename)
    const img_link = 'http://localhost:8000/uploads/' + req.file.filename
    console.log(img_link)
    res.json({ msg: "img uploaded post" })
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