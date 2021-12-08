const express = require('express');
const router = express.Router();
const User = require('../models/user');

const {userSignup} = require('../controller/auth')

router.post('/signup',userSignup)



module.exports = router