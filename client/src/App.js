import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

// Redux setup
import { Provider } from 'react-redux'; /* to associate our Store to our React app */
import store from './store';

// authorization
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUserAction } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

// components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/common/PrivateRoute';
import CreateProfile from './components/profile/CreateProfile';
import EditProfile from './components/profile/EditProfile';
import AddExperience from './components/experience/AddExperience';

import './App.css';

console.log('Executing code at App.js');

// Check to see if the jwt token is in local storage
if (localStorage.jwtToken) {

  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);

  // Decode token to get user info
  const decodedToken = jwt_decode(localStorage.jwtToken);

  // Dispatch action 'setCurrentUser' to set user and isAuthenticated
  store.dispatch(setCurrentUser(decodedToken));

  const currentTime = Date.now() / 1000; // convert milis to seconds

  // Check if expired token, if so, logout user
  if (decodedToken.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUserAction());

    // Clear current Profile (set it to null)
    store.dispatch(clearCurrentProfile());

    // Redirect to login page
    window.location.href = '/login';
  }
}

// COMPONENT
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
              {/* <Route exact path="/dashboard" component={Dashboard} /> */}
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              <PrivateRoute exact path="/add-experience" component={AddExperience} />
            </div>

            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
