const express = require('express')

const app = express()

app.get('/signup', (req, res)=> {
    res.send({name:'timothy', age: 22})
})

app.get('/login', (req, res)=> {
    res.send('Login page')
})

app.get('/order', (req, res)=> {
    res.send('Order page')
})

app.get('/summary', (req, res)=> {
    res.send('Summary page')
})
app.get('/schedule', (req, res)=> {
    res.send('Schedule page')
})
app.listen(3500, () => {
    console.log('Server is up on port 3500.')

})