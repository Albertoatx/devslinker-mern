import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

// Redux setup
import { Provider } from 'react-redux'; /* to associate our Store to our React app */
import store from './store';

// authorization
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions';

// components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import './App.css';

// Check to see if the jwt token is in local storage
if (localStorage.jwtToken) {

  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);

  // Decode token to get user info
  const decodedToken = jwt_decode(localStorage.jwtToken);

  // Dispatch action 'setCurrentUser' to set user and isAuthenticated
  store.dispatch(setCurrentUser(decodedToken));

}


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Navbar />

            {/*-- <Landing /> only component to be full screen */}
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </div>

            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
