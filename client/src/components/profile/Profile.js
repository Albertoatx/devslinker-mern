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

  _isMounted = false;

  /* good place to make Ajax endpoint requests which don't require user interaction */
  componentDidMount() {
    //console.log('componentDidMount');

    // get the 'handle' param in the URL using 'props.match.params' injected by <Route>
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }

    this._isMounted = true;
  }

  componentWillUnmount() {
    //console.log('componentWillUnmount');
    this._isMounted = false;
  }


  /**
   * componentWillReceiveProps Lifecycle Method.
   * That name will continue to work until version 17 (where will be DEPRECATED)
   * 
   * It is invoked before a mounted component receives new props.
   * If you need to update the state in response to prop changes 
   * (for example, to reset it), you may compare 'this.props' and 'nextProps'
   * and perform state transitions using this.setState() in this method.
   * 
   * TESTED: Called twice when we enter into a particular profile for the 1st time: 
   *    1st call (PROFILE_LOADING): 
   *      this.props.profile.loading = false (redux initial state)
   *      nextProps.profile.loading: true,  
   *      nextProps.profile.profile: null
   *    2nd call (GET_PROFILE): 
   *      this.props.profile.loading = true (redux state after PROFILE_LOADING change)
   *      nextProps.profile.loading: false, 
   *      nextProps.profile.profile: data (if handle exists), null (if handle does NOT exist)
   *  
   *    In successive displays of other particular profiles, 'nextProps.profile.profile' has 
   *    the data (redux state) of the previous one consulted.
   *    
   *   IT WORKS but I comment it because i use 'componentDidUpdate'
  */
  /*
   componentWillReceiveProps(nextProps) {
     console.log('componentWillReceiveProps');
     console.log('this.props.profile.loading: ', this.props.profile.loading);
     console.log({ nextProps });
 
     // If a profile handle doesn't exist, 'loading' stays true forever showing spinner
     if (nextProps.profile.profile === null && this.props.profile.loading) {
       this.props.history.push('/not-found'); // redirect
     }
 
     // Solve bug of the spinner if we logout while being on the Profile page.
     // (a logout action does NOT dispatch a 'IS_LOADING' so, should a logout happpen)
     // (both 'props.profile.loading' + 'nextProps.profile.loading' should be 'false')
     // Solution: Redirect to 'dashboard' (which is a PrivateRoute) and because of that
     // the 'dashboard' will automatically redirect to 'login' if we are not logged in
     //else 
     if (nextProps.profile.profile === null &&
       this.props.profile.loading === false &&
       nextProps.profile.loading === false) {
       this.props.history.push('/dashboard');
     }
   }
   */


  /**
 * componentDidUpdate Lifecycle Method.
 * (ALTERNATIVE to 'componentWillReceiveProps' which will be deprecated)
 * 
 * It is the last 'Updating' method (caused by changes to 'props' or 'state')
 * For example: typing a letter in any input field will trigger the 'render'
 * and 'componentDidUpdate' method (because component 'state' changes).
 * 
 * TESTED: Called twice when we enter into a particular profile for the 1st time: 
  *    1st call (PROFILE_LOADING): 
  *      this.props.profile.loading = true  (the contrary to componentWillReceiveProps)
  *      prevProps.profile.loading: false,  (redux initial state)
  *      prevProps.profile.profile: null
  *    2nd call (GET_PROFILE): 
  *      this.props.profile.loading = false 
  *      prevProps.profile.loading: true (redux state after PROFILE_LOADING change)
  *      prevProps.profile.profile: null (value of props BEFORE doing the GET_PROFILE)
  *  
  *   Here prevProps is similar to 'this.props' in componentWillReceiveProps
  *   Here 'this.props' is similar to 'nextProps' in componentWillReceiveProps
 */
  componentDidUpdate(prevProps) {
    //console.log('componentDidUpdate');
    //console.log('this.props.profile.loading: ', this.props.profile.loading);
    //console.log('this.props.profile.profile: ', this.props.profile.profile);
    //console.log({ prevProps });

    // If a profile handle doesn't exist, 'loading' stays true forever showing spinner
    if (this.props.profile.profile === null && !this.props.profile.loading) {
      this.props.history.push('/not-found'); // redirect
    }

    // Solve bug of the spinner if we logout while being on the Profile page.
    // (a logout action does NOT dispatch a 'IS_LOADING' so, should a logout happpen)
    // (both 'props.profile.loading' + 'prevProps.profile.loading' should be 'false')
    // Solution: Redirect to 'dashboard' (which is a PrivateRoute) and because of that
    // the 'dashboard' will automatically redirect to 'login' if we are not logged in
    //else 
    if (this.props.profile.profile === null &&
      this.props.profile.loading === false &&
      prevProps.profile.loading === false) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    //console.log('render');
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
          <ProfileAbout profile={profile} />
          <ProfileCreds experiences={profile.experience} educations={profile.education} />
          {profile.githubusername ? (<ProfileGithub username={profile.githubusername} />) : null}
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
  //console.log('mapDispatchToProps');
  return {
    getProfileByHandle: (handle) => dispatch(getProfileByHandleAction(handle)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);