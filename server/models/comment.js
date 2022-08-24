const mongoose = require('mongoose')
const Schema = mongoose.Schema({
    writerId:{type:String,required:true},
    content:{type:String,required:true},
    postId:{type:String,required:true},
},{
    collections:'comments'
})

const Comment = mongoose.model('Comment',Schema)

module.exports = Comment;