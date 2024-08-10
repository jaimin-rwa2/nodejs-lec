const express = require("express")
const multer = require("multer")

const app = express()

app.use(express.json())
app.use('/src/images', express.static("src/images")) // to give access to static files
const storage = multer.diskStorage({
    // storage settings
    destination: function (req, file, cb) {
        cb(null, 'src/images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 100000)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })


app.get('/', upload.single('img'), (req, res) => {

    console.log(req.body['imgName'])
    console.log(req.file)

    res.json({
        data: "data"
    })
})

app.listen(8000)