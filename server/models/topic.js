const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    name: {type : String , required: true},
},
{collections: 'topics'}
)

const Topic = mongoose.model('Topic', Schema)

module.exports = Topic;