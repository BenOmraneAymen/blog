const router = require('express').Router();
const Comment = require('../models/comment');

router.get('/:postId',async (req,res)=>{
    const {postId} = req.params
    await Comment.find({postId:postId}).then((result)=>{
        res.send(result)
    })
})

router.post('/create', (req, res) => {
    let new_comment = new Comment({
        writerId: req.body.writerId,
        content: req.body.content,
        postId: req.body.postId
    });
    new_comment.save().then(() => {
        res.send('comment created')
    });
});

router.put('/',async (req,res)=>{
    let old_comment = await Comment.findById(req.body.id)
    old_comment.content = req.body.content
    old_comment.save().then(()=>{
        res.send('comment updated')
    })
})

router.delete('/',async (req,res)=>{
    await Comment.findByIdAndDelete(req.body.id).then(()=>{
        res.send('comment deleted')
    })
})

module.exports = router;