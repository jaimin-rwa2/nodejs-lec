const express = require('express')
const path = require('path')

const app = express()


app.set('view engine', 'ejs')

app.use(express.json())


const todo_arr = []


app.get('/', (req, res) => {
    const query_data = req.query

    console.log(1);
    if (query_data['id']) {
        console.log(2);
        const index = query_data['id']
        if (todo_arr[index]) {
            console.log(3);
            update_data = todo_arr[index]
            res.render('index', { todo_data: todo_arr, update_data: update_data, update: true, index: index })
        } else {
            console.log(4);
            update_data = "empty"
            res.render('index', { todo_data: todo_arr, update: false })
        }


    } else {
        console.log(5);
        res.render('index', { todo_data: todo_arr, update: false })
    }

})

app.post('/', (req, res) => {
    const body_data = req.body
    todo_arr.push(body_data['todo_item'])
    res.render('index', { todo_data: todo_arr, update: false })
})

app.put('/:id', (req, res) => {
    const body_data = req.body
    const index = req.params['id']

    res.render('update', { todo_data: todo_arr, update_data: todo_arr[index], update: true, index: index })

})

app.delete('/:id', (req, res) => {

    const index = req.params['id']
    todo_arr.splice(index, 1)
    res.render('index', { todo_data: todo_arr, update: false })
})

app.listen(8000)


