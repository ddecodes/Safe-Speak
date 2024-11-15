const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = mongoose.Schema({
    bid: {
        type: String,
        required: true
    },
    username: {
        type: String,
        default: "user"
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        required: true
    },
    tags: [{
        type: String
    }]
})

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;