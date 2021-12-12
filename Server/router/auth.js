const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken')


const {userSignup,userSignupDetails,userSignin} = require('../controller/auth')

router.post('/signup',userSignup)

router.post('/mobile_signup',userSignupDetails)

router.post('/signin',userSignin)




module.exports = router