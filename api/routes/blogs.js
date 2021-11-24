const express = require('express');
const router = express.Router();s
const Blog = require('../models/blog');

// Post Route - Create New Blog Post
router.post('/', async (req, res) => {
  const { body } = req; 

  const post = new Blog(body); 

  try {
      const newPost = await post.save();
      res.json(newPost);
  } catch (err) {
      res.json({ message: err });
  }
});

// Get Route - Get All Blog Posts
router.get('/:id', async (req, res) => {
  try {
      const post = await Blog.findById(req.params.id);
      res.send(post)
  } catch (err) {
      res.json({ message: err })
  }
});

// Get Route - Get Single Post with ID as parameter (deprecated, use the following route with /:id)
router.param('id', (req, res, next, id) => {
  return Blog.findById(id, (err, blog) => {
    if(err) {
      return res.sendStatus(404);
    } else if(blog) {
      req.blog = blog;
      return next();
    }
  }).catch(next);
});

// Get Route - Get Single Post with ID
router.get('/:id', async (req, res) => {
  try {
      const post = await Blog.findById(req.params.id);
      res.send(post)
  } catch (err) {
      res.json({ message: err })
  }
});

// PATCH Route - Update Blog Post by Id
router.patch('/:id', async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  try {
      const updatedPost = await Blog.updateOne(
          { _id: id },
          {
              $set: body
          })
      res.json(updatedPost)
  } catch (err) {
      res.json({ message: err })
  }
});

// DELETE Route - Delete Existing Blog Post by Id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
      let removePost = await Blog.deleteOne({ _id: id })
      res.json(removePost)
  } catch (err) {
      res.json({ message: err })
  }
})

module.exports = router;