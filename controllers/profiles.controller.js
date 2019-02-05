

// Load mongoose models
const Profile = require('../models/Profile');
const User = require('../models/User');

// ----------------------------------------------------------------------------
// getUserProfile - A controller method that retrieves the user profile info
// ----------------------------------------------------------------------------
exports.getUserProfile = (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.user.id })
    .then(profile => {

      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
}
