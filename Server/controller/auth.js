const User = require('../models/user');
const bcrypt = require('bcryptjs')
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceToken = process.env.TWILIO_SERVICE_TOKEN;
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')
const client = require('twilio')(accountSid, authToken);
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const crypto = require('crypto');


const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:process.env.EMAIL_TOKEN
    }
}))


exports.userSignup = async(req, res) => {
    const { mobileNumber } = req.body
    if (req.body["sign_up_by"] == "user") {
        const userData = await User.findOne({ mobileNumber })
                if (userData) {
                    return res.status(401).json({ message: "Number already exists" })
                }
                const user = new User({ mobileNumber })
                user.save().then((user) => {
                    client.verify.services(serviceToken)
                    .verifications
                    .create({to:`+91${mobileNumber}`, channel: 'sms'})
                    .then(verification => console.log(verification));
                    const {_id} = user 
                    res.status(200).json({ message: "saved successfully and otp had sent",_id })
                }).catch(err => {
                    console.log(err)
                })
            
    }
}

exports.userSignupDetails = asyncHandler(async(req, res) => {
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
                console.log("result",result)
                if (err) {
                    res.status(422).json({ error: err })
                } else {
                    const token = jwt.sign({_id:req.body.userId},process.env.JWT_SECRET)
                    const {mobileNumber,following,followers,email,user_name,name} = result
                     transporter.sendMail({
                        to:email,
                        from:"travo.socialmedia@gmail.com",
                        subject:"Signup success",
                        html:"<h1>Welcome to Travo</h1><br><h2> We are waiting for you</h2>"
                    })
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

exports.resetPassword = (req,res)=>{
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString("hex")
        console.log(token)
        console.log(buffer)
        User.findOne({email:req.body.email}).then((user)=>{
            if(!user){
                return res.status(422).json({error:"User with this email doesn't exist"})
            }   
        user.resetToken = token;
        user.expireToken = Date.now() + 3600000
        user.save().then((result)=>{
            transporter.sendMail({
                to:user.email,
                from:"travo.socialmedia@gmail.com",
                subject:"Reset Password",
                html:`
                <p>You requested for password reset</p>
                <h5>please click this <a href="http://localhost:3000/reset-password/${token}">link </a> to reset your password</h5>
                `
            })
            //https://travosocialmedia.herokuapp.com/api/auth/
            res.json({message : "New password link has send to your registered email"})
        })
    })

    })
}

exports.newPassword = (req,res)=>{
    const newPassword = req.body.password;
    const resetToken = req.body.resetToken;
    User.findOne({resetToken:resetToken,expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
            return res.status(422).json({message:"Try again session expired"})
        }
        bcrypt.hash(newPassword,10).then(hashedPassword=>{
            user.password = hashedPassword;
            user.resetToken = undefined;
            user.expireToken = undefined;
            user.save().then((userDetails)=>{
                res.status(200).json({message:"Password updated successfully"})
            })
        })
    }).catch(err=>{
        console.log(err)
    })

}
