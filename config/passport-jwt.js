const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// We need Mongoose to search the user that comes with the payload
const User = require('mongoose').model('users');

// 'Options' to control how the token is extracted from the request or verified. 
// ---------
// Required fields:
// * opts.secretOrKey: A string or buffer to verify the token's signature 
// * opts.jwtFromRequest: Specify a extractor (callback) to extract the JWT 
//     from the request.
//     Note: A number of extractor functions are provided in 
//           passport-jwt.ExtractJwt. We use one of those extractor functions: 
//          'ExtractJwt.fromAuthHeaderAsBearerToken()'
//          (Creates a extractor that looks for the JWT in the  
//           authorization header with the scheme 'bearer')
const opts = {}
opts.secretOrKey = require('./keys').jwtSECRET;
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

// Construct the JWT authentication strategy using the 'opts'
// 'done' is a passport callback accepting arguments (error, user, info)
// ----------------------------------------------------------------------------
module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      // We are getting the payload from the token in 'jwt_paylod'
      // With that, get the User that's been sent in the token
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            // user exists -> return the user (user is now in 'req.user')
            return done(null, user);
          }
          // user does not exist -> return false
          return done(null, false, { message: 'Unknown user' });
        })
        .catch(err => console.log(err));
    })
  );
}; 
