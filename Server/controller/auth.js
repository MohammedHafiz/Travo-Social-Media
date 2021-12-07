const User = require ('../models/user');

exports.userSignup = (req,res) =>{
    var auth = req.body;
    console.log("hgfhgjhfjf",auth);
    const {mobileNumber} = req.body

    if(req.body["sign_up_by"] == "user"){
        User.findOne({mobileNumber})
        .then(userData=>{
            if(userData){

                return res.status(401).json({message:"Number already exists"})
            }
            const user = new User({mobileNumber})
            user.save().then((user)=>{
                res.status(200).json({message:"saved successfully"})
            }).catch(err=>{
                console.log(err)
            })
        })
    }
    if(req.body["sign_up_by"] == "propertyOwner"){
        User.findOne({mobileNumber:mobileNumber}).then(userData=>{
            console.log(userData)
           return res.status(401).json({message:"Number already exists"})
        })
    }
}