import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux'; // to connect this component to the redux store

import PropTypes from 'prop-types';  // define types for our 'props' 

// Import 'action creator' function
import { logoutUserAction } from '../../actions/authActions';

// COMPONENT
class Navbar extends Component {

  //onLogoutClick dispatch 'logoutUser'
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {

    const { isAuthenticated, user } = this.props.auth;

    // Links for 'Sign Up', 'Login'
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">Sign Up</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
      </ul>
    );

    // Link for 'Logout'
    const authLinks = (
      <ul className="navbar-nav ml-auto">

        <li className="nav-item">
          <a href="" className="nav-link" onClick={this.onLogoutClick}>
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: '25px', marginRight: '5px' }}
              title="You must have a Gravatar connected to your email to display an image"
            />
            {' '}
            Logout
          </a>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">DevsLinker</Link>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  Developers
              </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    )
  }
}

// Define types (strings, etc) to know what types to expect for our incoming data 
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,    // type function
  auth: PropTypes.object.isRequired,        // type object
};

// Map 'Redux state' to the 'props' of this component so that we can use them
//      here by using 'this.props.auth'
// ----------------------------------------------------------------------------
const mapStateToProps = (state) => ({
  auth: state.auth,
});

// Using mapDispatchToProps() STANDARD Notation
// Attach 'Actions' to 'props' of this component so that it will dispatch them
//    That way those actions can be called from our components (here in 'onLogoutClick') 
//   'dispatch' is a function provided to us by the Redux store.  
// ----------------------------------------------------------------------------  
const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUserAction())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

// Using mapDispatchToProps() SHORTHAND Notation!
// (avoid the boilerplate code in mapDispatchToProps() for the common case  )
// (where the 'action creator arguments' match the 'callback prop arguments')
// ----------------------------------------------------------------------------
//export default connect(mapStateToProps, { logoutUser: logoutUserAction })(Navbar);