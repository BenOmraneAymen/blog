const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./database')
const authRoute = require('./routes/authRoute')
const blogsRoute = require('./routes/blogsRoute')
const commentRoute = require('./routes/commentRoute')
const likeRoute  = require('./routes/likeRoute')
const topicRoute = require('./routes/topicRoute')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const corsOption = {
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: "http://localhost:3000"
};
app.use(cookieParser());
app.use(cors(corsOption))
app.use(express.static('upload'))
app.use(bodyParser.json())
app.use('/',authRoute)
app.use('/blogs',blogsRoute)
app.use('/comment',commentRoute)
app.use('/like',likeRoute)
app.use('/topic',topicRoute)

app.listen(4000, () => {console.log('listening on port 4000')})