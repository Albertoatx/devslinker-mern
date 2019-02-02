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

module.exports = router;