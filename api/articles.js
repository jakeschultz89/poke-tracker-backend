// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Models
const { Article } = require('../models');

// Controllers
const index = async (req, res) => {
    console.log('inside of /api/articles');
    try {
        const allArticles = await Article.find({});

        res.json({ articles: allArticles });
    } catch (error) {
        console.log('Error inside of /api/articles');
        console.log(error);
        return res.status(400).json({ message: 'Articles not found. Please try again.' });
    }
}

const show = async (req, res) => {
    const { id } = req.params;
    try {
        // look for article based on id
        const article = await Article.findById(id);
        res.json({ article });
    } catch (error) {
        console.log('Error inside of /api/articles/:id');
        console.log(error);
        return res.status(400).json({ message: 'Article not found. Try again...' });
    }
}

const create = async (req, res) => {
    const { title, author, date, body, image } = req.body;

    try {
        const newArticle = await Article.create({ title, author, date, body, image });
        console.log('new article created', newArticle);
        res.json({ article: newArticle });
    } catch (error) {
        console.log('Error inside of POST of /api/articles');
        console.log(error);
        return res.status(400).json({ message: 'Article was not created. Please try again...' }); 
    }
}

const update = async (req, res) => {
    console.log(req.body);
    try {
        const updatedArticle = await Article.update({ title: req.body.title }, req.body); // updating the article
        const article = await Article.findOne({ title: req.body.title });

        console.log(updatedArticle); // { n: 1, nModified: 0, ok: 1 }
        console.log(article); // an article object 

        res.redirect(`/api/articles/${article.id}`);

    } catch (error) {
        console.log('Error inside of UPDATE route');
        console.log(error);
        return res.status(400).json({ message: 'Article could not be updated. Please try again...' });
    }
}

const deleteArticle = async (req, res) => {
    const { id } = req.params;
    try {
        console.log(id);
        const result = await Article.findByIdAndRemove(id);
        console.log(result);
        res.redirect('/api/articles');
    } catch (error) {
        console.log('inside of DELETE route');
        console.log(error);
        return res.status(400).json({ message: 'Article was not deleted. Please try again...' });
    }
}

// GET api/articles/test (Public)
router.get('/test', (req, res) => {
    res.json({ msg: 'Articles endpoint OK!'});
});

// GET -> /api/articles/
router.get('/', passport.authenticate('jwt', { session: false }), index); 
// GET -> /api/articles/:id
router.get('/:id', passport.authenticate('jwt', { session: false }), show);
// POST -> /api/articles
router.post('/', passport.authenticate('jwt', { session: false }), create);
// PUT -> /api/articles
router.put('/', passport.authenticate('jwt', { session: false }), update);
// DELETE => /api/articles/:id
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteArticle);

module.exports = router;