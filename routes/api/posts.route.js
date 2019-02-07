const router = require('express').Router();
const passport = require('passport');
const postCtrl = require('../../controllers/posts.controller');

// @route   GET api/posts/test
// @desc    Test post route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: "Posts Works" }));

//-----------------------------------------------------------------------------
// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post('/',
  passport.authenticate('jwt', { session: false }),
  postCtrl.addPost
);

module.exports = router;