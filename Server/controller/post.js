const Post = require('../models/post')


exports.create_post = (req,res)=>{
    const {title,description} = req.body
    if(!title || !description ){
        return res.status(422).json({message:"please fill all the details"})
    }
    const post = new Post({
        title,
        description,
        postedBy:req.user
    })
    post.save().then(result=>{
        res.status(200).json({result:result})
    }).catch(err=>{
        console.log(err)
    })

}

exports.my_post=(req,res)=>{
    
}