const { Book } = require('../models/book')

const getBooks = async (req, res) => {
    try {

        const login = req.cookies['login']
        if (login) {
            const data = await Book.find()

            res.json({
                data: data
            })
        } else {
            res.json({
                msg: "user is not logged in please login"
            })
        }



    } catch (error) {
        res.json({
            error: error
        })
    }

}

const getBook = async (req, res) => {
    try {

        const id = req.param('id')
        const data = await Book.findOne({ _id: id })

        res.json({
            data: data,
            data_id: data.id
        })
    } catch (error) {
        res.json({
            error: error
        })
    }

}

const createBook = async (req, res) => {
    try {
        const req_body = req.body

        const id = req_body['id']
        const name = req_body['name']
        const discription = req_body['discription']
        const auther = req_body['auther']

        await Book.create({
            id: id,
            name: name,
            discription: discription,
            auther: auther
        })

        res.json({
            msg: 'data created'
        })
    } catch (error) {
        res.json({
            error: error
        })
    }

}

const updateBook = async (req, res) => {
    try {
        const data = await Book.find()

        res.json({
            data: data,
        })
    } catch (error) {
        res.json({
            error: error
        })
    }

}

const deleteBook = async (req, res) => {
    try {
        const data = await Book.find()

        res.json({
            data: data
        })
    } catch (error) {
        res.json({
            error: error
        })
    }

}


module.exports = { getBooks, getBook, createBook, updateBook, deleteBook }