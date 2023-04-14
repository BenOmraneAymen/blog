const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    iconName:{type : String , required: true,unique:true},
    name: {type : String , required: true,unique:true},
},
{collections: 'topics'}
)

const Topic = mongoose.model('Topic', Schema)

module.exports = Topic;