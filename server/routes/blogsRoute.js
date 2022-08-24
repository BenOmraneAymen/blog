const router = require('express').Router();
const Blog = require('../models/blog');


router.get('/',(req,res)=>{
    Blog.find({}).then((result)=>{
        res.send(result)
    })
})

router.post('/create', (req, res) => {
    let new_blog = new Blog({
        title: req.body.title,
        content: req.body.content,
        topics: req.body.topics,
        writer: req.body.writer
    });
    console.log(new_blog)
    new_blog.save().then(() => {
        res.send('blog created')
    });
})

module.exports = router;