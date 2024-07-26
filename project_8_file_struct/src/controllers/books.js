const { Book } = require('../models/books')


function getApi(req, res) {
    // book
    res.json({
        msg: 'routes called'
    })
}

module.exports = { getApi }