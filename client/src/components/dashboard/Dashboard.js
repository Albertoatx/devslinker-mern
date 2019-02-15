import React, { Component } from 'react';

import { connect } from 'react-redux'; // to connect this component to the redux store
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Import custom components
import Spinner from '../common/Spinner';

// Import 'action creator' function
import { getCurrentProfileAction } from '../../actions/profileActions';


// COMPONENT
class Dashboard extends Component {

  /* good place to make Ajax endpoint requests which don't require user interaction */
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {

    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = <h4>TODO: DISPLAY PROFILE</h4>
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// Define types (strings, etc) to know what types to expect for our incoming data 
Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,  // type func 
  auth: PropTypes.object.isRequired,             // type object
  profile: PropTypes.object.isRequired           // type object
};


// Map 'Redux state' to the 'props' of this component so that we can use them
//      here by using 'this.props.auth' and 'this.props.profile'
// ----------------------------------------------------------------------------
const mapStateToProps = (state) => ({
  auth: state.auth,
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
    getCurrentProfile: () => dispatch(getCurrentProfileAction())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

// Using mapDispatchToProps() SHORTHAND Notation!
// (avoid the boilerplate code in mapDispatchToProps() for the common case  )
// (where the 'action creator arguments' match the 'callback prop arguments')
// ----------------------------------------------------------------------------
//export default connect(mapStateToProps, { getCurrentProfile: getCurrentProfileAction })(Dashboard);

