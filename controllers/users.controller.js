const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

// Load mongoose User model
const User = require('../models/User');

// ----------------------------------------------------------------------------
// register - A controller method that registers new users
// ----------------------------------------------------------------------------
exports.register = (req, res) => {

  User
    .findOne({ email: req.body.email })
    .then(user => {
      // if user already exists
      if (user) {
        return res.status(404).json({ email: "Email already exist" });
      } else {
        // generate Gravatar URLs in Node.js based on gravatar specs
        const avatar = gravatar.url(req.body.email, {
          s: '200', // Size
          r: 'pg',  // Rating
          d: 'mm'   // Default
        });

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar: avatar,
          password: req.body.password
        });

        //console.log(newUser);

        // generate a salt of 10 characters
        bcrypt.genSalt(10, (err, salt) => {
          // create the hashed password using the salt
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            // save the user with the hashed password
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user)) // Send JSON representation of the user
              .catch(err => console.log(err));
          });
        });
      }
    });
};


// ----------------------------------------------------------------------------
// register - A controller method that registers new users using ASYNC-AWAIT
// (le falta el TRY-CATCH y la parte del avatar)
// ----------------------------------------------------------------------------

exports.registerv2 = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });

  if (user) {
    return res.status(400).json({ email: "Email already exists" })
  } else {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    let salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    let user = await newUser.save();
    res.json(user);
  }
}
