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
        writerId: req.body.writerId
    });
    console.log(new_blog)
    new_blog.save().then(() => {
        res.send('blog created')
    });
})

router.put('/',async (req,res)=>{
    let old_blog = await Blog.findById(req.body.id);
    old_blog.title = req.body.title;
    old_blog.content = req.body.content;
    old_blog.topics = req.body.topics;
    old_blog.save().then(()=>{
        res.send('blog updated')
    }
    )
})

router.delete('/',(req,res)=>{
    Blog.findByIdAndDelete(req.body.id).then(()=>{
        res.send('blog deleted')
    }
    )
}
)

module.exports = router;