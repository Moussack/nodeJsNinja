const Blog = require('../models/blog'); // representation of the db, View in MVC

const blog_index = (req, res) => {
   Blog.find()
      .sort({ createdAt: -1 })
      .then((result) => {
         res.render('index', { title: 'All Blogs', blogs: result });
      })
      .catch((err) => {
         console.log(err);
      });
};

const blog_details = (req, res) => {
   const id = req.params.id;
   // Show a data from db by id
   Blog.findById(id)
      .then((result) => {
         // render details page create to front end
         res.render('details', { blog: result, title: 'Blog Details' });
      })
      .catch((err) => {
         res.status(404).render('404', { title: 'Blog Not Found' });
      });
};

const blog_create_get = (req, res) => {
   // render create page to front end
   res.render('create', { title: 'CREATE a new blog' });
};

const blog_create_post = (req, res) => {
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
};

const blog_delete = (req, res) => {
   const id = req.params.id;
   Blog.findByIdAndDelete(id)
      .then(() => {
         res.json({ redirect: '/blogs' });
      })
      .catch((err) => {
         console.log(err);
      });
};

module.exports = {
   blog_index,
   blog_details,
   blog_create_get,
   blog_create_post,
   blog_delete,
};
