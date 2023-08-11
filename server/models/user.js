const mongoose = require('mongoose')
const hashHelpers = require('../helpers/hash');

const userSchema = mongoose.Schema({
    username: {type : String , required: true},
    password: {type : String , required: true, unique:true},
    email: {type : String , required: true},
    isAdmin:{type:Boolean, default:false},
    isSuspended:{type:Boolean, default:false},
    friends:{type:Array, default:[]},
},
{collections: 'users'}
)

userSchema.pre('findOneAndUpdate', async function (next) {
    try {
      if (this._update.password) {
        this._update.password = await hashHelpers.hashPassword(this._update.password)
        next();
      }
    } catch (err) {
      console.log(err)
    }
  })
  

const User = mongoose.model('User', userSchema)

module.exports = User; 