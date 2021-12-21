const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const {create_post,my_post,followers_post,postLike,postdislike,postComment,delete_comment} = require('../controller/post')

router.post('/create_post',verifyToken,create_post);

router.get('/my_post',verifyToken,my_post)

router.get('/followers_post',verifyToken,followers_post)

router.put('/like',verifyToken,postLike)

router.put('/dislike',verifyToken,postdislike)

router.put('/comment',verifyToken,postComment)

router.delete('/delete_comment',verifyToken,delete_comment)







module.exports = router;
