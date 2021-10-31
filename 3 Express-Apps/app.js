// require express, etc
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app instances
const app = express();

// connect to mongodb
const dbUri = 'mongodb+srv://reyzapper:test1234@cluster0.zyxgx.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose
   .connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => {
      console.log('connected to db');
      // listen for requests
      app.listen(3000);
   })
   .catch((err) => {
      console.log(err);
   });

// register view engine
app.set('view engine', 'ejs');

// middleware and static file
app.use(express.static('public')); // for css at Node.js Crash Course Tutorial #8 @11:30
app.use(express.urlencoded({ extended: true })); // for getting data from form submit ; Node.js Crash Course Tutorial #10 @4:00
app.use(morgan('dev')); // logging

/* app.use('/styles', express.static(__dirname + '/styles')); */ // for custom folder
/* ------------------------------------------------------------------------------------------------------- */

// Routing
app.get('/', (req, res) => {
   // redirects homepage '/' to blogs page
   res.redirect('/blogs');
});

app.get('/about', (req, res) => {
   // render about page to front end
   res.render('about', { title: 'ABOUT' });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404
app.use((req, res) => {
   // render 404 page to front end
   res.status(404).render('404', { title: '404' });
});

// mongoose and mongo sandbox
/* app.get('/add-blog', (req, res) => {
   const blog = new Blog({
      title: 'ASD TEST',
      snippet: 'LROEM',
      body: 'LROEMLROEMLROEM',
   });

   blog
      .save()
      .then((result) => {
         res.send(result);
      })
      .catch((err) => {
         console.log(err);
      });
});
// allblogs
app.get('/all-blogs', (req, res) => {
   Blog.find()
      .then((result) => {
         res.send(result);
      })
      .catch((err) => {
         console.log(err);
      });
});

// single  doc
app.get('/single-blog', (req, res) => {
   Blog.findById('617a7987b059d4eeaa5132d0')
      .then((result) => {
         res.send(result);
      })
      .catch((err) => {
         console.log(err);
      });
}); */
