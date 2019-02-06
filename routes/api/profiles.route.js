const router = require('express').Router();
const passport = require('passport');
const profileCtrl = require('../../controllers/profiles.controller');

// @route   GET api/profile/test
// @desc    Test profiles route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: "Profiles Works" }));

// ----------------------------------------------------------------------------
// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), profileCtrl.getUserProfile);

// ----------------------------------------------------------------------------
// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), profileCtrl.upsertUserProfile);


module.exports = router;