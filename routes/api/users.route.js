const router = require('express').Router();
const users = require('../../controllers/users.controller');
const passport = require('passport');

// ----------------------------------------------------------------------------
// @route   GET api/users/test
// @desc    Test users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: "Users Works" }));

// ----------------------------------------------------------------------------
// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', users.register);

// ----------------------------------------------------------------------------
// @route   POST api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', users.login);

// PRIVATE ROUTES -------------------------------------------------------------
// @route   GET api/users/current
// @desc    Return current user
// @access  Private
// It calls 2 functions: 
//  1º) 'password.authenticate()' - calls the code in 'passport-jwt.js' to 
//       extract the jwt from the request (in the 'authorization' head) 
//       and return the 'user' info from the DB 
//  2º) callback which takes the user from the previous step (done)
router.get('/current', passport.authenticate('jwt', { session: false }), users.current);

module.exports = router;