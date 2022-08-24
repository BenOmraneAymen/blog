const mongoose = require('mongoose')
const Schema = mongoose.Schema({
    title: {type : String , required: true},
    content: {type : String , required: true},
    topics: [],
    likes:[],
    comments:[],
    writer: {type:String, required:true},
},
{collections: 'blogs'}
)

const Blog = mongoose.model('Blog', Schema)

module.exports = Blog;
