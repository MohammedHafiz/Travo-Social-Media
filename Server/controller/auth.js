const User = require ('../models/user');
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const serviceToken = process.env.TWILIO_SERVICE_TOKEN;

//const client = require('twilio')(accountSid, authToken);


exports.userSignup = (req,res) =>{
    console.log("dfk")
    var auth = req.body;
    console.log("hgfhgjhfjf",auth);
    const {mobileNumber} = req.body

    if(req.body["sign_up_by"] == "user"){
        User.findOne({mobileNumber})
        .then(userData=>{
            if(userData){
                console.log("userData",userData)
                return res.status(401).json({message:"Number already exists"})
            }
            const user = new User({mobileNumber})
            user.save().then((user)=>{
                // client.verify.services(serviceToken)
                // .verifications
                // .create({to:`+91${mobileNumber}`, channel: 'sms'})
                // .then(verification => console.log(verification));
                res.status(200).json({message:"saved successfully and otp had sent"})
            }).catch(err=>{
                console.log(err)
            })
        })
    }
    // if(req.body["sign_up_by"] == "propertyOwner"){
    //     User.findOne({mobileNumber:mobileNumber}).then(userData=>{
    //         console.log(userData)
    //        return res.status(401).json({message:"Number already exists"})
    //     })
    // }
}
// exports.userSignupDetails = (req,res) =>{
//     const {name,user_name,mobileNumber,email,password} = req.body
//     User.findOne({mobileNumber}).

// }

