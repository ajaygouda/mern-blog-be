const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    categoryID: Number,
    author: String,
    authorID: String,
    date: String,
    banner: String,
});
module.exports = mongoose.model("blogs", blogSchema)