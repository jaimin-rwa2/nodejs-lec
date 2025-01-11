const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/imgs')
    },
    filename: (req, file, cb) => {
        const preFix = Date.now() + '-' + Math.round(Math.random() * 100000)
        cb(null, preFix + '-' + file.originalname)
    }
})


const multerConfig = multer({ storage: storage })

module.exports = { multerConfig }