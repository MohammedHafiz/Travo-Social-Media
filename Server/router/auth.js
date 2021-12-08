const express = require('express');
const router = express.Router();
const User = require('../models/user');

const {userSignup} = require('../controller/auth')

router.post('/signup',userSignup)
router.get('/',(req,res)=>{
    console.log("iinside ")
    res.write('Welcome')
})


module.exports = router