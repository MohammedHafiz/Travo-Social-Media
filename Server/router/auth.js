const express = require('express');
const router = express.Router();


const {userSignup,otpSignup} = require('../controller/auth')

router.post('/signup',userSignup)

router.post('/mobile_signup',otpSignup)



module.exports = router