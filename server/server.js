const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./database')
const authRoute = require('./routes/authRoute')
const blogsRoute = require('./routes/blogsRoute')
const commentRoute = require('./routes/commentRoute')
const likeRoute  = require('./routes/likeRoute')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))
app.use('/',authRoute)
app.use('/blogs',blogsRoute)
app.use('/comment',commentRoute)
app.use('/like',likeRoute)


app.listen(3000, () => {console.log('listening on port 3000')})