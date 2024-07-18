const express = require('express')
const app = express()

app.use(express.json())


const user = []


app.post('/' ,(req, res) => {
    const name = req.body.name
    console.log(name);

})