const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const {create_post} = require('../controller/post')

router.post('/create_post',verifyToken,create_post);

router.post('/my_post',verifyToken,my_post)







module.exports = router;
