const express = require('express');
const router = express.Router();


const {userSignup,userSignupDetails} = require('../controller/auth')

router.post('/signup',userSignup)

// router.post('/mobile_signup',userSignupDetails)




module.exports = router