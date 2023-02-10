const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    title: {type : String , required: true},
    content: {type : String , required: true},
    topics: [],
    writerId: {type:String, required:true},
    image:{type:String,required:false}
},
{timestamps: true},
{collections: 'blogs'}
)

const Blog = mongoose.model('Blog', Schema)

module.exports = Blog;
