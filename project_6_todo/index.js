const express = require('express')
const path = require('path')

const app = express()


app.set('view engine', 'ejs')

app.use(express.json())


const todo_arr = []


app.get('/', (req, res) => {
    const body_data = req.body



    if (body_data['id']) {
        const index = req.params['id']
        if (todo_arr[index]) {
            update_data = todo_arr[index]
        } else {
            update_data = "empty"
        }

        res.render('index', { todo_data: todo_arr, update_data: update_data, update: true, index: index })
    } else {
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


