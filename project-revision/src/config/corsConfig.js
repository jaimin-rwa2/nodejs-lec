const allowedOrigins = require("./allowedOrigins")

const corsOptions = {
    origin: (origin, cb) =>{
        // when we use localhost then value of origin us undefile then add condition :- !origin
        if (allowedOrigins.indexOf(origin) != -1 || !origin) {
            cb(null, true)
        }else{
            cb(new Error("not allowed by cors"))
        }
    },
    optionSuccessStatus: 200
}

module.exports = corsOptions, {allowedOrigins};