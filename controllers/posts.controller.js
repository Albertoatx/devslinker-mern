// Load Mongoose models
const Post = require('../models/Post');
const Profile = require('../models/Profile');

// Load Input Validation functions
const validatePostInput = require('../validation/post.validator');

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

  newPost.save().then(post => res.json(post));
}