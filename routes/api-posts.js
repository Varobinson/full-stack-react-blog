var express = require('express');
var router = express.Router();
const models = require('../models');

/* GET all posts. */
// GET /api/v1/posts
router.get('/', function(req, res) {
  models.Post.findAll()
  .then((posts)=>{
    res.json(posts)
  })
});

//Get 1 Post by ID
// Get /api/v1/posts/102
router.get('/:id', (req, res)=>{
  models.Post.findByPk(req.params.id)
  .then((post)=>{
    if(post){
      res.json(post)

    }else{
      res.status(404).json({
        error: 'Post not found'
      })
    }
  })
})

// Update Post 
// PUT api/v1/posts/101
router.get('/:id', (req, res)=>{
  if(!req.body || !req.body.author || !req.body.title || !req.body.content || !req.body.published){
    res.status(400).json({
      error: 'Please submit all required fields'
    })
    return;
  }
  models.Post.update({
    author: req.body.author,
    title: req.body.title,
    content: req.body.content,
    published: req.body.published
  }, {
    where:{
      id: req.params.id
    
    }
  })
  .then(update=>{
    if(updated && updated[0]  > 0){
      res.status(404).json({
        succes: 'post successful'
      })
    }else{
      res.status(404).json({
      error: 'Post not found'
    })
    }
  })
  // .then(updated=>{
  //   if(updated && updated[0]  > 0){
  //   res.status(202).json({
  //   }else{
  //     res.status(404).json({
  //       error: 'Post not found'
  //   })
  //   });
  // })
})

//Create new Post 
router.post('/', (req, res)=>{
  if(!req.body || !req.body.author || !req.body.title || !req.body.content || !req.body.published){
    res.status(400).json({
      error: 'Please submit all required fields'
    })
    return;
  }
  models.Post.create({
    author: req.body.author,
    title: req.body.title,
    content: req.body.content,
    published: req.body.published

  })
  .then((post) => {
    res.status(201).json(post)
  })
})


// Delete Post
// DELETE api/v1/posts/101
router.delete('/:id', (req, res)=>{
  models.Post.destroy({
    where: {
      id: req.params.id,
    }
  }).then(deleted=>{
    if(deleted === 1){
      res.status(202).json({
        succes: 'Post deleted'
      })
    }else{
      res.status(400).json({
        error: 'Please submit all required fields'
      })
    }
    })
})


module.exports = router;
