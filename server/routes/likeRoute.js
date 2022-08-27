const router = require('express').Router();
const Like = require('../models/like')

router.get('/:postId',async (req,res)=>{
    const {postId} = req.params
    await Like.find({postId:postId}).then((result)=>{
        res.send(result)
    })
})

router.post('/',(req,res)=>{
    const {postId,type,writerId} = req.body
    const new_like = new Like({
        postId,
        type,
        writerId
    });
    new_like.save().then(()=>{
        res.send('like created')
    })
})

router.put('/',async (req,res)=>{
    const {id,type} = req.body
    let old_like = await Like.findById(id)
    old_like.type = type
    old_like.save().then(()=>{
        res.send('like updated')
    })
})

router.delete('/',async (req,res)=>{
    const {id} = req.body
    await Like.findByIdAndDelete(id).then(()=>{
        res.send('like deleted')
    })
})

module.exports = router