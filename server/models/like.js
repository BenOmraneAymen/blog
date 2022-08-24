const mongoose = require('mongoose')
const Schema = mongoose.Schema({
    writerId:{type:String,required:true},
    postId:{type:String,required:true},
    type:{type:String,default:normal},
},{
    collections:'likes'
})
const model = mongoose.model('Like',Schema) 

module.exports = model;