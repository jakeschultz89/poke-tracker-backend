// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Models
const { Game } = require('../models');

// Controllers
const index = async (req, res) => {
    console.log('inside of /api/games');
    try {
        const allGames = await Game.find({});

        res.json({ games: allGames });
    } catch (error) {
        console.log('Error inside of /api/games');
        console.log(error);
        return res.status(400).json({ message: 'Games not found. Please try again.' });
    }
}

const show = async (req, res) => {
    const { id } = req.params;
    try {
        // look for game based on id
        const game = await Game.findById(id);
        res.json({ game });
    } catch (error) {
        console.log('Error inside of /api/games/:id');
        console.log(error);
        return res.status(400).json({ message: 'Game not found. Try again...' });
    }
}

const create = async (req, res) => {
    const { title, platform, date, image } = req.body;

    try {
        const newGame = await Game.create({ title, platform, date, image });
        console.log('new game created', newGame);
        res.json({ game: newGame });
    } catch (error) {
        console.log('Error inside of POST of /api/games');
        console.log(error);
        return res.status(400).json({ message: 'Game was not created. Please try again...' }); 
    }
}

const update = async (req, res) => {
    console.log(req.body);
    try {
        const updatedGame = await Game.update({ title: req.body.title }, req.body); // updating the game
        const game = await Game.findOne({ title: req.body.title });

        console.log(updatedGame); // { n: 1, nModified: 0, ok: 1 }
        console.log(game); // a game object 

        res.redirect(`/api/games/${game.id}`);

    } catch (error) {
        console.log('Error inside of UPDATE route');
        console.log(error);
        return res.status(400).json({ message: 'Game could not be updated. Please try again...' });
    }
}

const deleteGame = async (req, res) => {
    const { id } = req.params;
    try {
        console.log(id);
        const result = await Game.findByIdAndRemove(id);
        console.log(result);
        res.redirect('/api/games');
    } catch (error) {
        console.log('inside of DELETE route');
        console.log(error);
        return res.status(400).json({ message: 'Game was not deleted. Please try again...' });
    }
}

// GET api/games/test (Public)
router.get('/test', (req, res) => {
    res.json({ msg: 'Games endpoint OK!'});
});

// GET -> /api/games/
router.get('/', passport.authenticate('jwt', { session: false }), index); 
// GET -> /api/games/:id
router.get('/:id', passport.authenticate('jwt', { session: false }), show);
// POST -> /api/games
router.post('/', passport.authenticate('jwt', { session: false }), create);
// PUT -> /api/games
router.put('/', passport.authenticate('jwt', { session: false }), update);
// DELETE => /api/games/:id
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteGame);

module.exports = router;