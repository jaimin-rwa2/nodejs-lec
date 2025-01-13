const { allowedOrigins } = require('../config/allowedOrigins')


const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        // while fetch API call {credentials : 'include'} :- require to pass in header to send coockie  data
        // to allow it below header need's to be set
        // need to add this as middle configration
        res.header('Access-Control-Allow-Credentials', true)
    }
    next()
}

module.exports = credentials;