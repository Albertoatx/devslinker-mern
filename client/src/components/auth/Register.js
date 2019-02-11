import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';

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
    errors: {}
  };

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

    // we don't have to do a localhost:5000 because we put that in a proxy value
    axios.post('api/users/register', newUser)
      .then(result => console.log(result.data))
      .catch(err => this.setState({ errors: err.response.data }))
    //.catch(err => console.log(err.response.data)) // to console log our errors
  }

  // render
  render() {
    const { errors } = this.state; /* errors = this.state.errors */

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

export default Register;