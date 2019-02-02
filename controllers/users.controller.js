const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

// Load mongoose User model
const User = require('../models/User');

// generate the token using a function instead of building it inside of the controller
const generateToken = (user, res) => {
  // console.log(user.id);
  // console.log(user._id); Both are valid
  const payload = {
    id: user.id,
    name: user.name,
    avatar: user.avatar
  };

  const secret = keys.jwtSECRET;
  //const secret = ''; // For testing purposes: must give an error (secret is required)

  const options = {
    expiresIn: "12h"
  };

  // Synchronous: Returns the JsonWebToken as string
  // return jwt.sign(payload, secret, options);  

  // Asynchronous: If callback supplied, the callback is called with the err or the JWT
  jwt.sign(payload, secret, options, (err, token) => {
    let generatedToken;

    if (err) {
      generatedToken = {
        success: false,
        errName: err.name, //send error as a response if we can't create token with success
        errMsg: err.message
      }
    } else {
      generatedToken = {
        success: true,
        token: 'Bearer ' + token //send the token as a response if login successful
      }
    }

    res.json(generatedToken);
  });
}

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


// ----------------------------------------------------------------------------
// login - A controller method that creates a JWT Token if login is successful
// ----------------------------------------------------------------------------
exports.login = (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email })
    .then(user => {
      // Check for user existence
      if (!user) {
        return res.status(400).json({ email: 'User not found' });
      }

      // Check Password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {

          /*
          // User Matched -> Create the token with a payload of info
          //
          // 1) Create JWT Payload
          const payload = { id: user.id, name: user.name, avatar: user.avatar };

          // 2) Sign Token (create our Json token)
          jwt.sign(payload,
            keys.jwtSECRET,
            { expiresIn: 3600 * 24 },  // 1 day
            // callback
            (err, token) => {
              // send the token as a response if we have a successful login
              res.json({
                success: true,
                token: 'Bearer ' + token
              });
            }
          ); */

          generateToken(user, res);

        } else {
          return res.status(400).json({ password: 'Password incorrect' });
        }
      });
    });

};