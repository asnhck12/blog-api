const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Post = require("../models/post");

//view posts
exports.post_get = asyncHandler(async(req, res, next) => {
    const allPosts = await Post.find().sort({ timeStamp: -1 }).populate('username').exec();
    res.render("post", { user: req.user, post_list: allPosts, admin: req.admin });
})

//Get post form
exports.post_create_get = (req, res, next) => {
    res.render("post", { user: req.user, errors: [], post_list: [] });
};

//Post new blog
exports.post_create_send = [
    body("subject", "Please enter a subject more than 3 letters").trim().isLength({ min: 3 }).escape(),
    body("post", "Please enter a post more than 3 letters").trim().isLength({ min: 3 }).escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const post = new Post({
            subject: req.body.subject,
            post: req.body.post,
            timeStamp: new Date(),
            published: false,
            username: req.user,
        });

        if (!errors.isEmpty()) {
            const allPosts = await Post.find().sort({ timeStamp: -1 }).populate('username').exec();
            res.render("post", {
                user: req.user,
                post_list: allPosts,
                errors: errors.array(),
                post: post,
            });
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


