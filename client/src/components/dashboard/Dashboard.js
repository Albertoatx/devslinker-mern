import React, { Component } from 'react';

import { connect } from 'react-redux'; // to connect this component to the redux store

import PropTypes from 'prop-types';

// Import 'action creator' function
import { getCurrentProfileAction } from '../../actions/profileActions';

class Dashboard extends Component {

  /* good place to make Ajax endpoint requests which don't require user interaction */
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    return (
      <div>

      </div>
    )
  }
}

// Define types (strings, etc) to know what types to expect for our incoming data 
Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,  // type func 
};


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

export default connect(null, mapDispatchToProps)(Dashboard);

// Using mapDispatchToProps() SHORTHAND Notation!
// (avoid the boilerplate code in mapDispatchToProps() for the common case  )
// (where the 'action creator arguments' match the 'callback prop arguments')
// ----------------------------------------------------------------------------
//export default connect(null, { getCurrentProfile: getCurrentProfileAction })(Dashboard);

