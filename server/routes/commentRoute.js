const router = require('express').Router();
const Comment = require('../models/comment');

router.get('/:postId',async (req,res)=>{
    try{

        const {postId} = req.params
        await Comment.find({postId:postId}).then((result)=>{
            res.send(result)
        })
    }catch(err){
        console.log(err)
    }
})

router.post('/create', (req, res) => {
    try{

        let new_comment = new Comment({
            writerId: req.body.writerId,
            content: req.body.content,
            postId: req.body.postId
        });
        new_comment.save().then(() => {
            res.send('comment created')
        });
    }catch(err){
        console.log(err)
    }
});

router.put('/',async (req,res)=>{
    try{

        let old_comment = await Comment.findById(req.body.id)
        old_comment.content = req.body.content
        old_comment.save().then(()=>{
            res.send('comment updated')
        })
    }catch(err){
        console.log(err)
    }
    })

router.delete('/',async (req,res)=>{
    try{
        await Comment.findByIdAndDelete(req.body.id).then(()=>{
            res.send('comment deleted')
        })
    }catch(err){
        console.log(err)
    }
})

module.exports = router;