import React, { Component } from 'react';
import { connect } from 'react-redux';  // to connect this component to the redux store
import { withRouter } from 'react-router-dom'; // to redirect from inside an Action
import { Redirect } from 'react-router-dom';

import classnames from 'classnames';
import PropTypes from 'prop-types';       // define types for 'props' 

// Action to dispatch (will be the 'mapDispatchToProps' param)
import { registerUserAction } from '../../actions/authActions';

// COMPONENT
class Register extends Component {

  /* we don't need a constructor to bind 'this' cause we use arrow functions
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };
  } */

  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    //errors: {}
  };

  // Will be deprecated in React 17
  /*
  componentWillReceiveProps(nextProps) {
    // test the 'errors' property after being Mapped to 'props'
    if (nextProps.errors) {
      // set the errors in the 'component state'
      this.setState({ errors: nextProps.errors });
    }
  }
  */

  // To secure 'login' route when we are already logged in
  // hook 'componentDidMount' is only called once per life cycle
  /*
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    } 
  }
  */

  // Put whatever is typed in our input fields in our component 'state'
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  // When we click on Submit button
  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  }

  // render
  render() {
    // const { errors } = this.state; /* errors = this.state.errors */
    const { errors } = this.props; /* with this I don't need 'componentWillReceiveProps' */

    // Secure 'register' route when we are already logged in 
    // (an alternative to 'componentDidMount')
    if (this.props.auth.isAuthenticated) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
             </p>

              <form onSubmit={this.onSubmit}>

                <div className="form-group">
                  <input
                    className={classnames("form-control form-control-lg", { 'is-invalid': errors.name })}
                    placeholder="Name"
                    name="name"
                    type="text"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  {errors.name && (<div className='invalid-feedback'>{errors.name}</div>)}
                </div>

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
                  <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
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

                <div className="form-group">
                  <input
                    className={classnames("form-control form-control-lg", { 'is-invalid': errors.password2 })}
                    placeholder="Confirm Password"
                    name="password2"
                    type="password"
                    value={this.state.password2}
                    onChange={this.onChange}
                  />
                  {errors.password2 && (<div className='invalid-feedback'>{errors.password2}</div>)}
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
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,  // type func 
  auth: PropTypes.object.isRequired,        // type object
  errors: PropTypes.object.isRequired       // type object
};

// Map 'Redux state' to the 'props' of this component so that we can use them
//      here by using 'this.props.auth' and 'this.props.errors'
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
    // deletePost: (id) => dispatch({type: 'DELETE_POST', id: id})  // example
    registerUser: (userData, history) => dispatch(registerUserAction(userData, history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));

// Using mapDispatchToProps() SHORTHAND Notation!
// (avoid the boilerplate code in mapDispatchToProps() for the common case  )
// (where the 'action creator arguments' match the 'callback prop arguments')
// ----------------------------------------------------------------------------
//export default connect(mapStateToProps, { registerUser: registerUserAction })(withRouter(Register)); 