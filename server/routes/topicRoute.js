const router = require('express').Router();
const topic = require('../models/topic');

router.get('/All',(req,res)=>{
    try{
        topic.find().sort({name:1}).then((result)=>{
            res.send(result)
        })
    }catch(err){
        console.log(err)
    }
})

router.get('/:id',(req,res)=>{
    try{
        topic.findById(req.params.id).then((result)=>{
            res.send(result)
        }).catch((err)=>{
            console.log(err)
        })
} catch(err){
    console.log(err)
}
})

router.post('/',(req,res)=>{
    try{
        const {name,iconName} = req.body
        const new_topic = new topic({
            name,iconName
        });
        new_topic.save().then(()=>{
            res.send('topic created')
        })
    }catch(err){
        console.log(err)
    }
})

router.put('/',async (req,res)=>{
    try{

        const {id,name} = req.body
        let old_topic = await topic.findById(id)
        old_topic.name = name
        old_topic.save().then(()=>{
            res.send('topic updated')
        }
        )
    }
    catch(err){
        console.log(err)
    }
})

router.delete('/:id',async (req,res)=>{
    try{

        const id = req.params.id
        console.log(id)
        await topic.deleteOne({_id:id}).then(()=>{
            res.send('topic deleted')
        })

    }catch(err){
        console.log(err)
    }
})

module.exports = router