const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// Blog routes ->
// Show the data from db to the user in frontend, use .find() mthod
router.get('/', blogController.blog_index);

//Handling render new blogs form page
router.get('/create', blogController.blog_create_get);

// handling POST single blog
router.post('/', blogController.blog_create_post);

// handling single blog page, render detail page
router.get('/:id', blogController.blog_details);

// handling DELETE single blog
router.delete('/:id', blogController.blog_delete);

module.exports = router;
