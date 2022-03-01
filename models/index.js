require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
});

const db = mongoose.connection;

// Set up event for db to print connection
db.once('open', () => {
    console.log(`Connect to MongoDB at ${db.host}:${db.port}`);
});

db.on('error', (error) => {
    console.log(`Database error`, error);
});

// Import all of your models
const Article = require('./Article');
const Game = require('./Game');
const Post = require('./Post');
const User = require('./User');

// export all the models from this file
module.exports = {
    Article,
    Game,
    Post,
    User
}