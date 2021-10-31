const express = require('express');
const router = express.Router();
const Blog = require('../models/blog'); // representation of the db

// Blog routes
// Show the data from db to the user in frontend, use .find() mthod
router.get('/', (req, res) => {
   Blog.find()
      .sort({ createdAt: -1 })
      .then((result) => {
         res.render('index', { title: 'All Blogs', blogs: result });
      })
      .catch((err) => {
         console.log(err);
      });
});

//Handling CREATE blogs
router.get('/create', (req, res) => {
   // render create page to front end
   res.render('create', { title: 'CREATE a new blog' });
});

// handling POST single blog
router.post('/', (req, res) => {
   // make new db instance and use the data for user input
   const blog = new Blog(req.body);
   console.log(req.body);

   // *** save it to db (it's async)
   blog
      .save()
      .then(() => {
         res.redirect('/');
      })
      .catch((err) => {
         console.log(err);
      });
});

// handling single blog page
router.get('/:id', (req, res) => {
   const id = req.params.id;
   // Show a data from db by id
   Blog.findById(id)
      .then((result) => {
         // render details page create to front end
         res.render('details', { blog: result, title: 'Blog Details' });
      })
      .catch((err) => {
         console.log(err);
      });
});

// handling DELETE single blog
router.delete('/:id', (req, res) => {
   const id = req.params.id;
   Blog.findByIdAndDelete(id)
      .then(() => {
         res.json({ redirect: '/blogs' });
      })
      .catch((err) => {
         console.log(err);
      });
});

module.exports = router;
