const express = require('express')


const app = express()
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    // res.send()
    res.sendFile('templates/index.html', { root: __dirname })
})

app.listen(8000)