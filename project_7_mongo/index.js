const express = require("express")
const mongoose = require("mongoose")
const multer = require("multer")
const fs = require('fs');
const path = require('path');

const User = require("./model")


const app = express()



app.use(express.json())  // to get data in body
app.use('/imgs', express.static("uploads")) // to five access to static files


const storage = multer.diskStorage({
    // storage settings
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
    // to get all data
    const data = await User.find()
    res.json({ data: data })
})


app.post('/', upload.single('img'), (req, res) => {
    // to create data
    const req_body = req.body
    console.log(req.body)
    const username = req_body["username"]
    const age = req_body["age"]
    let img_link = ''

    if (req.file) {
        img_link = 'http://localhost:8000/imgs/' + req.file.filename
    }
    console.log(img_link)
    User.create({ username: username, age: age, img: img_link })
    res.json({ msg: "post" })
})

app.post('/upload', upload.single('img'), async (req, res) => {
    // to upload file
    console.log(req.file)
    console.log(req.file.filename)
    const img_name = req.file.filename
    console.log(img_name)
    await User.create({ img: 'http://localhost:8000/imgs/' + img_name })
    res.json({ msg: "img uploaded post" })
})

app.get('/upload/:id', async (req, res) => {
    // to get img data
    const id = req.params['id']
    const data = await User.find({ _id: id })
    res.json({ msg: "get uploads", data: data })
})


app.put('/:id', async (req, res) => {
    // to update data
    const id = req.params['id']
    const req_body = req.body
    const username = req_body["username"]
    await User.findOneAndUpdate({ _id: id }, { username: username })
    res.json({ msg: "put" })
})

app.delete('/:id', async (req, res) => {
    // to delete data
    const id = req.params['id']
    await User.deleteOne({ _id: id })
    res.json({ msg: "delete" })
})

app.delete('/upload/:id', async (req, res) => {
    // to delte image
    const id = req.params['id']
    const data = await User.findOne({ _id: id })
    await User.deleteOne({ _id: id })
    const img_path = 'uploads/' + path.basename(data.img)
    console.log("=======")
    console.log(img_path)
    console.log("=======")
    fs.unlink(img_path, (err) => {
        if (err) {
            console.error(`Error removing file: ${err}`);
            return;
        }

        console.log(`File ${img_path} has been successfully removed.`);
    });
    res.json({ msg: "delete" })
})


app.listen(8000, async () => {
    // to start server
    await mongoose.connect("mongodb://localhost:27017/learn-mongo")
    console.log("db connected")
    console.log('server started on http://localhost:8000/')
})