const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 1. Make schema first
const blogSchema = new Schema(
   {
      title: {
         type: String,
         required: true,
      },
      snippet: {
         type: String,
         required: true,
      },
      body: {
         type: String,
         required: true,
      },
   },
   { timestamps: true }
);

// 2. Make a Model based on that schema
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
