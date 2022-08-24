const mongoose = require('mongoose')
const Schema = mongoose.Schema({
    title: {type : String , required: true},
    content: {type : String , required: true},
    topics: [],
    numberOfLikes: {type:Number, default:0},
    comments:[],
    writer: {type:String, required:true},
},
{collections: 'blogs'}
)

const Blog = mongoose.model('Blog', Schema)

module.exports = Blog;
