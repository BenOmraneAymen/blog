const router = require('express').Router();
const Like = require('../models/like')

router.get('/:postId',async (req,res)=>{
    try{
        const {postId} = req.params
        await Like.find({}).select({postId:postId}).then((result)=>{
            res.send(result)
        })
    }catch(err){
        console.log(err)
    }
})

router.get('/:postId/:writerId',async (req,res)=>{
    try{
        const postId = req.params.postId
        const writerId = req.params.userId
        await Like.find({postId:postId,writerId:writerId}).then((result)=>{
            res.send(result)
        })
    }catch(err){
        console.log(err)
    }
})
    
router.post('/',(req,res)=>{
    try{
        const {postId,type,writerId} = req.body
        const new_like = new Like({
            postId,
            type,
            writerId
        });
        new_like.save().then(()=>{
            res.send('like created')
        })
    }catch(err){
        console.log(err)
    }
})

router.put('/',async (req,res)=>{
    try{

        const {id,type} = req.body
        let old_like = await Like.findById(id)
        old_like.type = type
        old_like.save().then(()=>{
            res.send('like updated')
        })
    }catch(err){
        console.log(err)
    }
    })

router.delete('/:postId/:writerId',async (req,res)=>{
    try{

        const {postId,writerId} = req.params
        await Like.findOneAndDelete({postId:postId,writerId:writerId}).then(()=>{
            res.send('like deleted')
        })
    }catch(err){
        console.log(err)
    }
})

module.exports = router