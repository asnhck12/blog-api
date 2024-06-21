const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Comment = require("../models/comment");

// View comments
exports.comment_get = asyncHandler(async (req, res, next) => {
    try {
        const allComments = await Comment.find().sort({ timeStamp: -1 }).populate('blog').exec();
        res.json(allComments);
    } catch (error) {
        next(error);
    }
});

// Comment new submission
exports.comment_create_send = [
    body("subject", "Please enter a subject more than 3 letters").trim().isLength({ min: 3 }).escape(),
    body("comment", "Please enter a comment more than 3 letters").trim().isLength({ min: 3 }).escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const comment = new Comment({
            name: req.body.name,
            subject: req.body.subject,
            comment: req.body.comment,
            timeStamp: new Date(),
        });

        try {
            await comment.save();
            res.status(201).json(comment);
        } catch (error) {
            next(error);
        }
    })
];

// Delete comment
exports.comment_delete = asyncHandler(async (req, res, next) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        res.status(204).json({ message: "Comment deleted" });
    } catch (error) {
        next(error);
    }
});