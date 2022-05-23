const express = require('express');
const mealsController = require('../controllers/meals');

const router = express.Router();

// GET /feed/posts
router.get('/fetch-meals', mealsController.getMeals);

// POST /feed/post
router.post('/add-meal', mealsController.postAddMeal);

module.exports = router;