const mongoose = require('mongoose');
const { Schema } = mongoose;

const gameSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    platform: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    image: {
        type: Image,
        required: true
    }
})

const Game = mongoose.model('Game', articleSchema);
module.exports = Game;