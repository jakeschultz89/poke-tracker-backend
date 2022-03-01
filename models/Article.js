const mongoose = require('mongoose');
const { Schema } = mongoose;

const articleSchema = new Schema({
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
        required: true
    }
})

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;