const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    image: {
        type: Image,
        required: false
    }
})

const Post = mongoose.model('Post', postSchema);
module.exports = Post;