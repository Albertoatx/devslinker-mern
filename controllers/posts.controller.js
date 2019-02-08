// Load Mongoose models
const Post = require('../models/Post');
const Profile = require('../models/Profile');

// Load Input Validation functions
const validatePostInput = require('../validation/post.validator');


// ----------------------------------------------------------------------------
// getAllPosts - A controller method that gets all the posts 
// ----------------------------------------------------------------------------
exports.getAllPosts = (req, res) => {

  // const errors = {}; don't need it because maximum 1 error (no validations)

  Post.find() // returns an empty array if no matches
    .sort({ date: -1 })
    .then(posts => {
      if (!posts || posts.length === 0) {
        return res.status(404).json({ noposts: 'There are no posts' });
      }

      res.json(posts);
    }
    )
    .catch(err => res.status(400).json(err));
  //.catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
}

// ----------------------------------------------------------------------------
// getPostById - A controller method that gets the post information 
//               using the 'post_id' request param 
// ----------------------------------------------------------------------------
exports.getPostById = (req, res) => {

  Post.findById(req.params.post_id)
    .then(post => {

      if (!post) {
        return res.status(404).json({ noposts: 'There is no post with that ID' });
      }

      res.json(post);
    })
    .catch(err => res.status(400).json(err));
  //.catch(err => res.status(404).json({ nopostfound: 'No posts found' }));
}

// ----------------------------------------------------------------------------
// addPost - A controller method that adds a post 
// ----------------------------------------------------------------------------
exports.addPost = (req, res) => {

  const { errors, isValid } = validatePostInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.user.name,
    avatar: req.user.avatar,
    user: req.user.id
  });

  newPost.save()
    .then(post => res.json(post))
    .catch(err => res.status(400).json(err));
}

// ----------------------------------------------------------------------------
// updatePost - A controller method that updates a post using the 'post_id' 
//              request param. Check that ONLY owner of the post can delete 
// ----------------------------------------------------------------------------
exports.updatePost = (req, res) => {

  const { errors, isValid } = validatePostInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // 1 DB access
  Post.findOneAndUpdate(
    {
      _id: req.params.post_id,
      user: req.user.id        // Check for post owner
    },
    {
      $set: { text: req.body.text }
    },
    {
      new: true,  // return the updated version
    }
  ).then((post) => {

    if (!post) {
      return res.status(404).json({
        error: 'Error updating post: Post not found or User not authorizated',
      });
    }

    res.json(post);
  }).catch((err) => {
    res.status(400).json(err);
    //res.status(500).json({ 'error': 'error updating post' });
  })

  /* 2 DB accesses but better error messaging (it detects when user is not owner)
  Post.findOne({ _id: req.params.post_id })
    .then(post => {
      //check post owner
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ notauthorized: 'User not authorizated' })
      }
      post.text = req.body.text

      post.save().then(post => res.json(post))
    })
    .catch(err => res.status(404).json({ postnotfound: 'No post found' }))
   */

}


// ----------------------------------------------------------------------------
// deletePost - A controller method that deletes a post using the 'post_id' 
//              request param. Check that ONLY owner of the post can delete 
// ----------------------------------------------------------------------------
exports.deletePost = (req, res) => {

  Post.findOneAndDelete(
    {
      _id: req.params.post_id,
      user: req.user.id        // Check for post owner
    })
    .then(post => {
      if (!post) {//check to see if a post was found/deleted
        res.status(404).json({ nopost: "no post found with that ID or user is not the post owner" });
      }

      res.json(post); // returns the deleted post
    })
    .catch(err => res.status(400).json(err)); //If _id is malformed it goes here
  //.catch(err => res.status(400).json({ nopost: "there was a problem deleting post...", err }));


  // Traversy version - No use doing a 'Profile.findOne' (read forum)
  /*                  - It does 3 DB accesses
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        // Check for post owner
        if (post.user.toString() !== req.user.id) {
          return res
            .status(401)
            .json({ notauthorized: 'User not authorized' });
        }

        // Delete
        post.remove().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  });
  */
}


// ----------------------------------------------------------------------------
// likeLogic - A controller method to Like or Unlike a post by using post_id
//              request param. 
// ----------------------------------------------------------------------------
exports.likePost = (req, res) => {

  Post.findById(req.params.post_id)
    .then(post => {

      if (!post) {
        return res.status(404).json({ nopost: 'No post found' });
      }

      // Post exists -> check if the user has already liked the post
      // (More efficient to use 'findIndex' than filter + map + indexOf)
      const indexOfUser = post.likes.findIndex(
        (like) => like.user.toString() === req.user.id
      );

      // To be able to like or unlike in the same route
      (indexOfUser === -1)
        ? post.likes.unshift({ user: req.user.id }) // not found -> like the post
        : post.likes.splice(indexOfUser, 1);        // found     -> unlike the post

      // save changes into MongoDB
      post.save()
        .then(post => res.json(post))

    })
    .catch(err => res.status(400).json(err));
  //.catch(err => res.status(404).json({ postnotfound: 'No post found' }));
}