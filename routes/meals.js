const express = require('express');

const mealsController = require('../controllers/meals');

const router = express.Router();

// GET /feed/posts
router.get('/fetch-meals', mealsController.getPosts);

// POST /feed/post
router.post('/add-meal', mealsController.createPost);

module.exports = router;