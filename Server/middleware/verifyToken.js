const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports = (req,res,next)=>{
    console.log("req.headers:",req.headers)
    const {authorization} = req.headers
    if(!authorization){
       return res.status(401).json({error: "you must be logged in"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,process.env.JWT_SECRET,async(err,payload)=>{
        console.log("payload: ",payload)
        console.log("token: ",token)
        if(err){
            return res.status(401).json({error:"You must be logged in"})
        }
        const {_id} = payload;
        const UserData = await User.findById(_id)
        req.user = UserData;
        console.log('req.user:',req.user)
        next()

    })

}