const User = require('../models/user');
const bcrypt = require('bcryptjs')
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceToken = process.env.TWILIO_SERVICE_TOKEN;
const asyncHandler = require('express-async-handler');

// const client = require('twilio')(accountSid, authToken);


exports.userSignup = (req, res) => {
    const { mobileNumber } = req.body
    if (req.body["sign_up_by"] == "user") {
        User.findOne({ mobileNumber })
            .then(userData => {
                if (userData) {
                    console.log("userData", userData)
                    return res.status(401).json({ message: "Number already exists" })
                }
                const user = new User({ mobileNumber })
                user.save().then((user) => {
                    // client.verify.services(serviceToken)
                    // .verifications
                    // .create({to:`+91${mobileNumber}`, channel: 'sms'})
                    // .then(verification => console.log(verification));
                    res.status(200).json({ message: "saved successfully and otp had sent",user })
                }).catch(err => {
                    console.log(err)
                })
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
        console.log("pooo");
        res.json({ "msg" :"User email already exists"})
    }
    else if (savedName) {
        res.status(422).json({ msg :"User name already exists"})
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
                    res.status(200).json({ result: result })
                }
            })

    })}

})

