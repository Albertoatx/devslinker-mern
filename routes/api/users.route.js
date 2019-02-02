const router = require('express').Router();
const users = require('../../controllers/users.controller');

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
// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', users.login);

module.exports = router;