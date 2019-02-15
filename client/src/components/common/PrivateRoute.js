import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// pass Router info in 'props' so that is available in tags which don't have <Route>
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

// We need to use Redux because we need to know if the user is authenticated
import { connect } from 'react-redux';

// Example
// <PrivateRoute exact path="/dashboard" component={Dashboard} />

// COMPONENT
// '...rest' will be the rest of the properties in the <PrivateRoute> tag
//          (in the example '...rest' will be 'exact' and 'path'
// Remember that <Route> passes extra info (history, location, match objects) in 
//          in the 'props' of the component it routes to. Also
//          has a 'render' property where we select which component to render
// Remember we are applying destructuring, so this will be the same as:
//          Component = props.component
//          auth = props.auth
const PrivateRoute = ({ component: Component, auth, ...rest }) => (

  <Route
    {...rest}  /* in the example: exact path="/dashboard"  */
    render={props => auth.isAuthenticated === true ?
      (
        <Component {...props} /> //will render <Dashboard> and passes all the 'props' to it
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(connect(mapStateToProps)(PrivateRoute));