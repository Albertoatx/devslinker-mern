const bodyParser = require('body-parser'); // npm install body-parser --save
const express = require('express');        // npm install express --save
const mongoose = require('mongoose');      // npm install mongoose --save
const passport = require('passport');
const path = require('path');

// Load our route files
const users = require('./routes/api/users.route');
const profiles = require('./routes/api/profiles.route');
const posts = require('./routes/api/posts.route');

// Set the 'NODE_ENV' variable 
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// MONGOOSE --------------------------------------------------------------------
mongoose.set('useFindAndModify', false); // deprecated

// DB config
const dbURI = require('./config/keys').mongoURI;

// Connect to MongoDB through a new Mongoose connection instance
mongoose.connect(dbURI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err))


// EXPRESS ---------------------------------------------------------------------
// init app
const app = express();
const port = process.env.PORT || 5000;


// Here add MIDDLEWARE necessary for REST API's. 
// -----------------------------------------------------------------------------
// bodyParser: Extracts body of an incoming request (JSON, urlencoded) 
//             and parses it into a JavaScript object
//             (only handles JSON and urlencoded data, not multipart)
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                          // parse application/json

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport-jwt')(passport);


// ROUTING: Use the routing files	
// -----------------------------------------------------------------------------
app.use('/api/users', users);
app.use('/api/profile', profiles); // singular: we never check a list of profiles
app.use('/api/posts', posts);

// DEPLOYMENT: If in production, serve the static assets (in the 'build' folder)
// -----------------------------------------------------------------------------
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  // For any other route, send 'index.html' file (entry point to React app)
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


// Use the Express application instance to listen to the port
app.listen(port, () => console.log(`Server running on port ${port}`));