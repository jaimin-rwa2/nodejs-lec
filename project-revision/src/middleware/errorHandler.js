const errorHandler = (err, req, res, next)=>{
    // we can write error logs in error file
    // also we can use logger middleware
    console.error(err);
    res.status(500).send(err.message)
}

module.exports = errorHandler;