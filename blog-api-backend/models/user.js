const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },    
    password: { type: String, required: true },
    author: { type: Boolean },
    admin: { type: Boolean },
})

module.exports = mongoose.model("User", UserSchema);