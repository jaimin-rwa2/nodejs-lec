const express = require('express')


const app = express()

const arr = []

app.use(express.json())

app.get('/', (req, res)=>{
    res.json({
        data: arr
    })
})


app.get('/:id', (req, res)=>{
    const index = Number(req.params['id'])
    if(isNaN(index)){
        res.json({
            msg: `this index ${index} is not valid index`
        })
    }else{

        if(arr[index]){
            res.json({
                data: arr[index]
            })
        }else{
            res.json({
                msg: `this index ${index} is not exist in array`
            })
        }

        
    }
})


app.post('/', (req, res)=>{
    const data = req.body["data"]
    arr.push(data)
    res.json({
        msg: "data is added"
    })
})

app.put('/:id', (req, res)=>{
    const index = Number(req.params["id"])
    const data = req.body["data"]
    if(isNaN(index)){
        res.json({
            msg: `this index ${index} is not valid index`
        })
    }else{

        if(arr[index]){
            arr[index] = data
            res.json({
                msg: "data is updated"
            })
        }else{
            res.json({
                msg: `this index ${index} is not exist in array`
            })
        }

        
    }
})



app.delete('/:id', (req, res)=>{
    const index = req.params["id"]
    arr.splice(index, 1)
    res.json({
        msg: "data is deleted"
    })
})

app.listen(8000, ()=>{
    console.log(`server stared on http://localhost:8000/`)
})
