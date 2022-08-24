const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    title: {type : String , required: true},
},
{collections: 'topics'}
)

const Topic = mongoose.model('Topic', Schema)

module.exports = Topic;