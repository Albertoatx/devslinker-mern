import React, { Component } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Import custom components
import Spinner from '../common/Spinner';
import ProfileItem from './ProfileItem';

// Import 'action creator' function
import { getAllProfilesAction } from '../../actions/profileActions';


// COMPONENT class based (we use 'componentDidMount' method)
class ListProfiles extends Component {

  /* good place for Ajax API requests which don't require user interaction */
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;

    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <h4>No profiles found...</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Browse and connect with developers
              </p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Define types (strings, etc) to know what types to expect for our incoming data
ListProfiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

// Map 'Redux state' to the 'props' of this component so that we can use them
//      here by using 'this.props.profile'
// ----------------------------------------------------------------------------
const mapStateToProps = state => ({
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
    getProfiles: () => dispatch(getAllProfilesAction()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListProfiles);


// Using mapDispatchToProps() SHORTHAND Notation!
// (avoid the boilerplate code in mapDispatchToProps() for the common case  )
// (where the 'action creator arguments' match the 'callback prop arguments')
// ----------------------------------------------------------------------------
//export default connect(mapStateToProps, { getProfiles: getAllProfilesAction })(ListProfiles);
