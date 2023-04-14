var mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/blogDB').then(() => {console.log('connected to database')}).catch(err => {console.log("err:",err)})

module.exports = mongoose