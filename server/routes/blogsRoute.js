const router = require('express').Router();
const bodyParser = require('body-parser');
const Blog = require('../models/blog');
const fileUpload = require('express-fileupload');
const path = require('path');
//const multer = require('multer')
const fs = require("fs");
const cookieparser = require('cookie-parser');
const { checkCookie } = require('../helpers/checkCookie');

router.use(fileUpload());


//var upload = multer()

/*
router.post('/', upload.single("file"), async (req, res) => {
    const {file,body:{title,content,topics,author}} = req;
    if(file.detectedFileExtension !== ".jpg" && file.detectedFileExtension !== ".png"){
        res.status(400).json({message:"Invalid file type"})
    }
    if(!title){
        res.status(400).json({message:"Title missing"})
    }
    if(!content){
        res.status(400).json({message:"Content missing"})
    }
    if(!topics){
        res.status(400).json({message:"Topic missing"})
    }
    if(!author){
        res.status(400).json({message:"Author missing"})
    }
    const image = req.file
    console.log(image)
    let t = Date.now();
    let imageName = image.originalname.split('.')[0]+t+'.'+image.originalname.split('.')[1];
    let new_blog = new Blog({
        title: title,
        content:content,
        topics: topics,
        writerId:author,
        image: imageName,
    });
       await pipeline(
        file.stream,
        fs.createWriteStream(`${__dirname}/../upload/${imageName}`)
      );
    console.log(new_blog)
    new_blog.save().then(() => {
        res.send('blog created')
    });
});
*/
router.get('/:id',(req,res)=>{
    try{
        if(req.params.id=='All'){
            Blog.find({}).then((result)=>{
                console.log("result",result)
                res.status(200).send(result)
            })
        }else{
            console.log('working ',req.params.id)
            Blog.find({topics:req.params.id}).then((result)=>{
                console.log("result",result)
                res.status(200).send(result)
            })
        }
    }catch(err){
        console.log(err)
    }
})

router.get('/id/:id',(req,res)=>{
    try{
        console.log(req.params.id)
        Blog.find({writerId:req.params.id}).then((result)=>{
            res.status(200).send(result)
        })
    }catch(err){
        console.log(err)
    }
})

router.post('/create', (req, res) => {
    try{
        let {title, content,topics, author} = req.body;
        console.log("body",req.body)
        console.log(title,topics,author)
        if(title && content && author){
            if (req.body.file!=null) {
                console.log('no file')
                let new_blog = new Blog({
                    title: title,
                    content:content,
                    topics: topics,
                    writerId:author,
                    image: null
                });
                new_blog.save().then(() => {
                    res.send('blog created')
                });
            }else{
                console.log('file');
                let image = req.files.file;
                let t = Date.now();
                let imageName = image.name.split('.')[0]+t+'.'+image.name.split('.')[1];
                let uploadPath = path.join(__dirname, '../upload', imageName);
                image.mv(uploadPath);
                let new_blog = new Blog({
                    title: title,
                    content:content,
                    topics: topics,
                    writerId:author,
                    image: imageName
                });
                console.log(new_blog)
                new_blog.save().then(() => {
                    res.send('blog created')
                });
            }
        }
    }catch(err){
        console.log(err)
    }
})

router.put('/',async (req,res)=>{
    try{

        let old_blog = await Blog.findById(req.body.id);
        old_blog.title = req.body.title;
        old_blog.content = req.body.content;
        old_blog.topics = req.body.topics;
        old_blog.image = req.body.image;
        old_blog.save().then(()=>{
            res.send('blog updated')
        }
        )
    }catch(err){
        console.log(err)
    }
    })

router.delete('/',(req,res)=>{
    try{
        Blog.findByIdAndDelete(req.body.id).then(()=>{
            res.send('blog deleted')
        }
        )
    }catch(err){
        console.log(err)
    }
}
)

module.exports = router;