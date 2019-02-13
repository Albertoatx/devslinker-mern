import React, { Component } from 'react';

import { connect } from 'react-redux'; // to connect this component to the redux store

import PropTypes from 'prop-types';  // define types for 'props' 
import classnames from 'classnames'; // use in the render() method

// Import 'action creator' function
import { loginUserAction } from '../../actions/authActions';

// COMPONENT
class Login extends Component {

  state = {
    email: '',
    password: '',
    errors: {}
  };

  // Put whatever is typed in our component 'state'
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  // When we click on Submit button
  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData, this.props.history);
  }

  // hook: a place to redirect to 'dashboard' - it works
  // (another option is to do redirect in the 'loginUserAction' - i choose that)
  /*
  componentDidUpdate() {
    const { isAuthenticated } = this.props.auth;

    if (isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  */

  render() {
    const { errors } = this.props;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
             </p>

              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    className={classnames("form-control form-control-lg", { 'is-invalid': errors.email })}
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {errors.email && (<div className='invalid-feedback'>{errors.email}</div>)}
                </div>

                <div className="form-group">
                  <input
                    className={classnames("form-control form-control-lg", { 'is-invalid': errors.password })}
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (<div className='invalid-feedback'>{errors.password}</div>)}
                </div>

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

// Define types (strings, etc) to know what types to expect for our incoming data 
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,     // type func 
  auth: PropTypes.object.isRequired,        // type object
  errors: PropTypes.object.isRequired       // type object
};

// Map 'Redux state' to the 'props' of this component so that we can use them
//      here by using 'this.props.auth' and 'this.props.errors'
// ----------------------------------------------------------------------------
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

// Using mapDispatchToProps() STANDARD Notation
// Attach 'Actions' to 'props' of this component so that it will dispatch them
//    That way those actions can be called from our components (here in 'on submit') 
//   'dispatch' is a function provided to us by the Redux store.  
// ----------------------------------------------------------------------------  
const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (userData, history) => dispatch(loginUserAction(userData, history))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

// Using mapDispatchToProps() SHORTHAND Notation!
// (avoid the boilerplate code in mapDispatchToProps() for the common case  )
// (where the 'action creator arguments' match the 'callback prop arguments')
// ----------------------------------------------------------------------------
//export default connect(mapStateToProps, { loginUser: loginUserAction })(Login);
