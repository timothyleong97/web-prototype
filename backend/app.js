const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
 )


app.get('/signup', (req, res)=> {
    res.send("signup page")
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