var express = require('express');
var router = express.Router();

const user_controller = require("../controllers/userController");
const post_controller = require("../controllers/postController");
const comment_controller = require("../controllers/commentController");

// Get login page
// router.get('/login',user_controller.login_get);

// Login Submission
router.post('/login',user_controller.log_in_post);

// Get signup page
// router.get('/signup',user_controller.sign_up_get);

// Sign up submission
router.post('/signup', user_controller.sign_up_post);

// Log
router.get('/log_out', user_controller.log_out);

// GET Posts 
router.get('/posts', post_controller.post_get);

// GET single Post by ID  
router.get('/posts/:id', post_controller.post_detail);

//Get Posts form
// router.get('/new_post', post_controller.post_create_get);

//submit Posts
router.post('/posts/new_post', post_controller.post_create_send);

//Delete Posts
router.post('/posts/:id/delete', post_controller.post_delete);

// GET Comments 
router.get('/posts/:id/comments', comment_controller.comment_get);

//Get comments form
// router.get('/comments/new_comment', comment_controller.comment_create_get);

//submit comments
router.post('/posts/:id/comments/new_comment', comment_controller.comment_create_send);

//Delete comments
router.post('/posts/:id/comments/delete', comment_controller.comment_delete);

module.exports = router;
