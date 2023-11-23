const express = require('express')
const app = express()
//routes

app.get('/', (req, res) => {
    res.send('Welcome to Amazon')
})
app.listen(5000, ()=> {
    console.log('Listening on port 5000')
})