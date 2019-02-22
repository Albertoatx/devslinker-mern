import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Import custom components
import Spinner from '../common/Spinner';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';

// Import 'action creator' function
import { getProfileByHandleAction } from '../../actions/profileActions';


// COMPONENT
class Profile extends Component {

  /* good place to make Ajax endpoint requests which don't require user interaction */
  componentDidMount() {

    // get the 'handle' param in the URL using 'props.match.params' injected by <Route>
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }


  render() {

    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back To Profiles
              </Link>
            </div>
            <div className="col-md-6" />
          </div>

          <ProfileHeader profile={profile} />
          <ProfileAbout />
          <ProfileCreds />
          <ProfileGithub />
        </div>
      );
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    )
  }
}


// Define types (strings, etc) to know what types to expect for our incoming data 
Profile.propTypes = {
  profile: PropTypes.object.isRequired,           // type object
  getProfileByHandle: PropTypes.func.isRequired   // type func
};


// Map 'Redux state' to the 'props' of this component so that we can use them
//      here by using 'this.props.profile'
// ----------------------------------------------------------------------------
const mapStateToProps = (state) => ({
  profile: state.profile
});

// Using mapDispatchToProps() STANDARD Notation
// Attach 'Actions' to 'props' of this component so that it will dispatch them
//    That way those actions can be called from our components 
//    (here in 'componentDidMount' because it is NOT triggered by user interaction) 
//   'dispatch' is a function provided to us by the Redux store.  
// ----------------------------------------------------------------------------  
const mapDispatchToProps = (dispatch) => {
  return {
    getProfileByHandle: (handle) => dispatch(getProfileByHandleAction(handle)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);