import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux'; // to connect this component to the redux store

import PropTypes from 'prop-types';  // define types for our 'props' 


// COMPONENT
class Landing extends Component {

  // To secure landing '/' route when we are already logged in
  // hook 'componentDidMount' is only called once per life cycle
  /*
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    } 
  }
  */

  render() {
    // Secure landing '/' route when we are already logged in
    // (this is an alternative to 'componentDidMount')
    if (this.props.auth.isAuthenticated) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Developer Connector
              </h1>
                <p className="lead"> Create a developer profile/portfolio, share posts and get help from other developers</p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-info mr-2">Sign Up</Link>
                <Link to="/login" className="btn btn-lg btn-light">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// Define types (strings, etc) to know what types to expect for our incoming data 
Landing.propTypes = {
  auth: PropTypes.object.isRequired,        // type object
};

// Map 'Redux state' to the 'props' of this component so that we can use them
//      here by using 'this.props.auth'
// ----------------------------------------------------------------------------
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
