const express = require('express')

const app = express()


app.set('view engine', 'ejs')

let data_h = "What is Lorem Ipsum?";
let data_p = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the is survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including ndustry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It haversions of Lorem Ipsum.";
let data_for = [11, 22, 33, 44, 55, 66, 77, 88, 99, 100]

let obj = {
    header: data_h,
    parf: data_p,
    data_for: data_for
}

app.get('/', (req, res) => {
    res.render('index', obj)
})

app.get('/data', (req, res) => {
    res.render('data')
})

app.listen(8000)