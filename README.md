# devslinker
Small social network app built with the MERN stack. 
The code is based on the Udemy course "MERN Stack Front To Back" by [Brad Traversy](http://www.traversymedia.com/).

## Requirements
- [Node and npm](https://nodejs.org)
- Make sure you have a MongoDB running version 

You will need to create a `keys_dev.js` file inside the server `config` folder. In that file you should specify the values for the next properties: 

```sh
module.exports = {
  // mandatory
  mongoURI: 'YOUR_OWN_MONGO_URI',
  jwtSECRET: 'YOUR_OWN_SECRET',

  // optional
  GITHUB_API_KEY: 'YOUR_OWN_GITHUB_API_KEY',
  GITHUB_API_SECRET: 'YOUR_OWN_GITHUB_API_SECRET'
};
```

## Installation and Running the App
1.  Download or clone the repo.
2.  Install the dependencies for the server with `npm install`.
3.  Install the dependencies for the client with `npm run client-install`.
4.  Run both the server & client concurrently with `npm run dev`.

### Notes: 
- Server runs on `http://localhost:5000` 
- Client runs on `http://localhost:3000`

- If we want to run the Express server only: `npm run server`
- If we want to run the React client only: `npm run client`

## Play around
You can take a look to a deployed version of the Devslinker app [here](https://devlinker-app.herokuapp.com/)
