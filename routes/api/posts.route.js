const router = require('express').Router();
const passport = require('passport');
const postCtrl = require('../../controllers/posts.controller');

// @route   GET api/posts/test
// @desc    Test post route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: "Posts Works" }));

//-----------------------------------------------------------------------------
// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get('/', postCtrl.getAllPosts);

//-----------------------------------------------------------------------------
// @route   GET api/posts/:post_id
// @desc    Get post by id
// @access  Public
router.get('/:post_id', postCtrl.getPostById);

//-----------------------------------------------------------------------------
// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post('/',
  passport.authenticate('jwt', { session: false }),
  postCtrl.addPost
);

//-----------------------------------------------------------------------------
// @route   PUT api/posts/:post_id
// @desc    Update post
// @access  Private
router.put('/:post_id',
  passport.authenticate('jwt', { session: false }),
  postCtrl.updatePost
);

//-----------------------------------------------------------------------------
// @route   DELETE api/posts/:post_id
// @desc    Delete post
// @access  Private
router.delete('/:post_id',
  passport.authenticate('jwt', { session: false }),
  postCtrl.deletePost
);

//-----------------------------------------------------------------------------
// @route   POST api/posts/like/:post_id
// @desc    Like post
// @access  Private
// I used just one route for both like and unlike 
router.post('/like/:post_id',
  passport.authenticate('jwt', { session: false }),
  postCtrl.likePost
);

module.exports = router;