const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Post = require("../models/post");

//view posts
exports.post_get = asyncHandler(async(req, res, next) => {
    const allPosts = await Post.find().sort({ timeStamp: -1 }).exec();
    const postsSummary = allPosts.map(post => ({title: post.title, timeStamp: post.timeStamp}));
    return res.send(postsSummary);
})

//view post in full
exports.post_detail = asyncHandler(async(req, res, next) => {
    const postId = req.params.id;
    const post = await Post.findById(postId).exec();
    return res.send(post);
})

//Get post form
exports.post_create_get = (req, res, next) => {
};

//Post new blog
exports.post_create_send = [
    body("title", "Please enter a title more than 3 letters").trim().isLength({ min: 3 }).escape(),
    body("post", "Please enter a post more than 3 letters").trim().isLength({ min: 3 }).escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const post = new Post({
            title: req.body.title,
            post: req.body.post,
            timeStamp: new Date(),
            published: false,
            username: req.user,
        });

        if (!errors.isEmpty()) {
            const allPosts = await Post.find().sort({ timeStamp: -1 }).populate('username').exec();
            return;
        } else {
            await post.save();
            res.redirect("/");
        }
    })
];

//delete post
exports.post_delete = asyncHandler(async (req,res, next) => {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect("/");
})


