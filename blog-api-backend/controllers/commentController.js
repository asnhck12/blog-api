const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Comment = require("../models/comment");

//view comments
exports.comment_get = asyncHandler(async(req, res, next) => {
    const allComments = await Comment.find().sort({ timeStamp: -1 }).populate('blog').exec();
    return res.send(allComments);
})

//Get comment form
exports.comment_create_get = (req, res, next) => {
};

//comment new submission
exports.comment_create_send = [
    body("subject", "Please enter a subject more than 3 letters").trim().isLength({ min: 3 }).escape(),
    body("comment", "Please enter a comment more than 3 letters").trim().isLength({ min: 3 }).escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const comment = new Comment({
            name: req.body.name,
            subject: req.body.subject,
            comment: req.body.comment,
            timeStamp: new Date(),
        });

        if (!errors.isEmpty()) {
            const allComments = await comment.find().sort({ timeStamp: -1 }).populate('blog').exec();
            return;
        } else {
            await comment.save();
            res.redirect("/");
        }
    })
];

//delete comment
exports.comment_delete = asyncHandler(async (req,res, next) => {
    await Comment.findByIdAndDelete(req.params.id);
    res.redirect("/comments");
})


