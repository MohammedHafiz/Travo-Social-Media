const User = require('../models/user');
const bcrypt = require('bcryptjs')
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceToken = process.env.TWILIO_SERVICE_TOKEN;
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')
const client = require('twilio')(accountSid, authToken);


exports.userSignup = async(req, res) => {
    const { mobileNumber } = req.body
    console.log(mobileNumber)
    if (req.body["sign_up_by"] == "user") {
        const userData = await User.findOne({ mobileNumber })
            console.log("userData",userData)
                if (userData) {
                    console.log("userData", userData)
                    return res.status(401).json({ message: "Number already exists" })
                }
                const user = new User({ mobileNumber })
                user.save().then((user) => {
                    client.verify.services(serviceToken)
                    .verifications
                    .create({to:`+91${mobileNumber}`, channel: 'sms'})
                    .then(verification => console.log(verification));
                    const {_id} = user 
                    res.status(200).json({ message: "saved successfully and otp had sent",user:{_id} })
                }).catch(err => {
                    console.log(err)
                })
            
    }
}

exports.userSignupDetails = asyncHandler(async(req, res) => {
    console.log(req.body)
    const { name, user_name, email, password } = req.body
    const savedUser = await User.findOne({ email })
    const savedName = await User.findOne({user_name})
    if (!email || !password || !user_name || !name) {
        res.status(422).json({ error: " Please enter all the fields" })
    } else if (savedUser) {
        res.status(422).json({ message :"User email already exists"})
    }
    else if (savedName) {
        res.status(422).json({ message :"User name already exists"})
    } else {

    bcrypt.hash(password, 10).then(async (hashedPassword) => {
        await User.findByIdAndUpdate(req.body.userId, {
            $set: {
                name,
                user_name,
                email,
                password: hashedPassword
            }
        }, {
            new: true
        })
            .exec((err, result) => {
                if (err) {
                    res.status(422).json({ error: err })
                } else {
                    const token = jwt.sign({_id:req.body.userId},process.env.JWT_SECRET)
                    const {mobileNumber,following,followers,email,user_name,name} = result
                    res.status(200).json({token,user: {mobileNumber,following,followers,email,user_name,name} })
                }
            })

    })}

})


exports.otpVerification = async (req,res)=>{
    const {otp,mobileNo} = req.body
    const verification_check = await client.verify.services(serviceToken)
    .verificationChecks
    .create({to:`+91${mobileNo}`, code: otp})
    if(verification_check.status == "approved"){
        return res.status(200).json({message:"Your mobile number is sucessfully verified"})
    }else{
        return res.status(401).json({error:"Please check the otp"})
    }
     
}

exports.userSignin = asyncHandler(async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
       return res.status(401).json({result:"Please fill the details"})
    }
    const userData = await User.findOne({email})
    if(!userData){
        return res.status(401).json({message:"Entered email is wrong"})
    }
    const ifMatched = await bcrypt.compare(password,userData.password)
    if(ifMatched){
        //creating jwt token with payload as user_id
        const token = jwt.sign({_id:userData._id},process.env.JWT_SECRET)
        const {mobileNumber,following,followers,email,user_name,name} = userData
        res.status(200).json({token,userDetails:{mobileNumber,following,followers,email,user_name,name}})
    }else{
        res.status(401).json({message:"Eneterd password is incorrect"})
    }
})
