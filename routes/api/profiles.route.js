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

// ----------------------------------------------------------------------------
// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get('/handle/:handle', profileCtrl.getUserProfileByHandle);

// ----------------------------------------------------------------------------
// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id', profileCtrl.getUserProfileByUser_id);

// ----------------------------------------------------------------------------
// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', profileCtrl.getAllProfiles);

// ----------------------------------------------------------------------------
// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post('/experience',
  passport.authenticate('jwt', { session: false }),
  profileCtrl.addExperienceToProfile);

// ----------------------------------------------------------------------------
// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post('/education',
  passport.authenticate('jwt', { session: false }),
  profileCtrl.addEducationToProfile);

module.exports = router;