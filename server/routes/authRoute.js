const router = require('express').Router();
const User = require('../models/user');
const hashHelpers = require('../helpers/hash');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

router.get('/', (req, res) => {
    User.find({}).then(result =>{
      res.send(result)
    })
  })
  
router.post('/signIn',async (req,res)=>{
    try{
        const duplicate = await User.findOne({email:req.body.email})
        if(duplicate){
            res.send('user already exists')
        }else{
            let hashedPassword = await hashHelpers.hashPassword(req.body.password)
            let user = new User({
                username: req.body.username,
                password: hashedPassword ,
                email: req.body.email
            })
            await user.save()
            res.send('User created')
        }
    }catch(err){
        res.send(err)
    }
})

router.post('/login',async (req,res)=>{
    try{
        const {email,password} = req.body
        const user = await User.findOne({email:email})
        if(user){
            if(await hashHelpers.checkPassword(password, user.password)){
                const accessToken = jwt.sign({email:email}, process.env.SECRET_KEY,{
                    expiresIn: '1h',
                })
                res.send({
                    message: 'login successful',
                    status: 200,
                    accessToken: accessToken
                })
            }else{
                res.send('password incorrect')
            }
        }else{
            res.send('user not found')
        }
    }catch(err){
        res.send(err)
    }
}
)

router.put('/suspend',async (req,res)=>{
    const guiltyUser = await User.findById(req.body.id)
    if(guiltyUser){
        if(guiltyUser.isSuspended)
        {
            guiltyUser.isSuspended = false
            guiltyUser.save()
            res.send('user unsuspended')
        }
        else{
            guiltyUser.isSuspended = true
            guiltyUser.save()
            res.send('user suspended')
        }
    }
    else{
        res.send('user not found')
    }

})

router.delete('/',async (req,res)=>{
    try{
        const {email} = req.body
        const user = await User.findOne({email:email})
        if(user){
            await User.findByIdAndDelete(user._id)
            res.send('user deleted')
        }else{
            res.send('user not found')
        }
    }catch(err){
        res.send(err)
    }
}
)


module.exports = router;