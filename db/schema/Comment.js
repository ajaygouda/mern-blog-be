const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    blogID: String,
    user: Object,
    comment: String,
    date:String
});
module.exports = mongoose.model("comments", commentSchema)