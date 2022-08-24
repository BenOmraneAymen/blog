var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/blogDB').then(() => {console.log('connected to database')}).catch(err => {console.log(err)})

module.exports = mongoose