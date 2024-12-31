const whileList = ["http://www.react-frontend.domain", "http://localhost:5173/"]  // allowedOrigins
const corsOptions = {
    origin: (origin, cb) =>{
        // when we use localhost then value of origin us undefile then add condition :- !origin
        if (whileList.indexOf(origin) != -1 || !origin) {
            // while fetch API call {credentials : 'include'} :- require to pass in header to send coockie  data
            // to allow it below header need's to be set
            // need to add this as middle configration
            // res.header("Access-Control-Allow-Credentials", true)   : 05:04:43
            cb(null, true)
        }else{
            cb(new Error("not allowed by cors"))
        }
    },
    optionSuccessStatus: 200
}

module.exports = corsOptions;