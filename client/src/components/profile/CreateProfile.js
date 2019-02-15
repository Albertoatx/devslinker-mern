import React, { Component } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TextFieldGroup from '../common/TextFieldGroup';


// COMPONENT
class CreateProfile extends Component {

  // Define state for our form fields
  state = {
    displaySocialInputs: false,
    handle: '',
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
    errors: {}
  };

  render() {
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create your profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required fields</small>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// Define types (strings, etc) to know what types to expect for our incoming data 
CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,       // type object
  errors: PropTypes.object.isRequired         // type object
};

// Map 'Redux state' to the 'props' of this component so that we can use them
//      here by using 'this.props.profile' and 'this.props.errors'
const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors
});


export default connect(mapStateToProps)(CreateProfile);