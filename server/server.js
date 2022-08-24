const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./database')
const authRoute = require('./routes/authRoute')
const blogsRoute = require('./routes/blogsRoute')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))
app.use('/',authRoute)
app.use('/blogs',blogsRoute)


app.listen(3000, () => {console.log('listening on port 3000')})