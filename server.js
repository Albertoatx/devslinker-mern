const bodyParser = require('body-parser'); // npm install body-parser --save
const express = require('express');     // npm install express --save


// Set the 'NODE_ENV' variable 
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// MONGOOSE --------------------------------------------------------------------
// Load the module dependencies


// Create a new Mongoose connection instance



// EXPRESS ---------------------------------------------------------------------
// init app
const app = express();
const port = process.env.PORT || 5000;

// Serve our static resources



// Here add MIDDLEWARE necessary for REST API's. 
// -----------------------------------------------------------------------------



// ROUTING  
//------------------------------------------------------------------------------
// Route to root
app.get('/', (req, res) => {
  //console.log('Enrutado generico para mostrar index.html');
  res.send('Helloooooooooo!!!');
}
);


// ROUTING: Load the routing files	
// -----------------------------------------------------------------------------

// Use the Express application instance to listen to the port
app.listen(port, () => console.log(`Server running on port ${port}`));