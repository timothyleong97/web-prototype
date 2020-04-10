const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
 )

app.listen(3500, () => {
    console.log('Server is up on port 3500.')

})