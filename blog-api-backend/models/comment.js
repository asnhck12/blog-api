const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    name: { type: String, required: true },
    subject: { type: String, required: true },
    comment: { type: String, required: true },
    timeStamp: { type: Date, default: Date.now },
    blog: { type: Schema.ObjectId, ref: "blog" }
})

CommentSchema.virtual("url").get(function() {
    return "/" + this._id;
})

CommentSchema.virtual("date_formatted").get(function () {
    return DateTime.fromJSDate(this.timeStamp).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model("Comment", CommentSchema);