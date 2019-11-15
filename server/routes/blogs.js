const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

router.get('/', (req, res) => {
  Blog
    .find()
    .then(blogs => {
      res.status(200).json(blogs);
    })
    .catch(err => {
      res.status(404).send('Not able to retrieve the Blogs.')
      console.log(err)
    });
})

router.get('/featured', (req, res) => {
  Blog
    .where("featured", true)
    .then(blogs => {
      res.status(200).json(blogs);
    })
    .catch(err => {
      res.status(404).send('Cannot get featured Blogs.');
      console.log(err)
    });
})

router.get('/:id', (req, res) => {
  Blog
    .findById(req.params.id)
    .then(blog => {
      if (!blog) res.status(404).send();
      res.status(200).json(blog)
    })
    .catch(err => {
      res.status(404).send('Cannot get the blog.');
      console.log(err)
    });
})

router.post('/', (req, res) => {
  const newBlog = new Blog({
    title: req.body.title,
    article: req.body.article,
    published: req.body.published,
    featured: req.body.featured,
    author: req.body.author
  })

  router.post('/', (req, res) => {
    let dbUser;
    User.findById(req.body.author)
      .then(user => {
        dbUser = user;
        const newBlog = new Blog({
          title: req.body.title,
          article: req.body.article,
          published: req.body.published,
          featured: req.body.featured,
          author: user._id
        })
        return newBlog.save();
      })
      .then(blog => {
        console.log(dbUser);
        dbUser.blogs.push(blog);
        dbUser.save().then(() => res.status(201).json(blog));
      }).catch((error => console.log(error)))
  })
})

  router.put('/:id', (req, res) => {
    User
      .findByIdAndUpdate(req.params.id,
        {
          title: req.body.title,
          article: req.body.article,
          published: req.body.published,
          featured: req.body.featured,
          author: req.body.author
        })
      .then(blogs => {
        res.status(204).json(blogs);
      });
  })

  router.delete('/:id', (req, res) => {
    Blog
      .findByIdAndRemove(req.params.id)
      .then(blogs => {
        if (blogs) res.status(200).json(blogs);
      })
      .catch(res.status(500).send('Cannot delete the blog.'))
  })

  module.exports = router;
