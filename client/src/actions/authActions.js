import axios from 'axios';

import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER, CLEAR_ERRORS } from './actionTypes';

/** 
 * NOTES about 'redux-thunk'
 * 'redux-thunk' will allow us NOT to return an Action Creator but to
 *  return a function and inside that function we can:
 *  1) stop/halt the dispatch 
 *  2) perform an async request
 *  3) resume dispatch and pass it to the reducer when request completed
 *  -------------------------------------------------------------------------*/


// Clear errors (used mainly when submitting forms)
// ---------------------------------------------------------------------------
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

// Register User Action (version without 'currying')
// ----------------------------------------------------------------------------
export const registerUserAction = function (userData, history) {

  return function (dispatch) {

    dispatch(clearErrors());

    // Call API endpoint
    axios.post('/api/users/register', userData)
      //.then(res => console.log(res))
      .then(res => history.push('/login'))
      .catch(err =>
        // If error, 'Thunk' resumes dispatch of the action to the 'errors' Reducer
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
}

// Register User Action (equvalente verison using "currying") 
export const registerUserActionV2 = (userData, history) => dispatch => {

  dispatch(clearErrors());

  // Call API endpoint
  axios
    .post('/api/users/register', userData)
    //.then(res => console.log(res.data))
    .then(res => history.push('/login'))
    .catch(err =>
      // If error, 'Thunk' resumes dispatch of the action to the 'errors' Reducer
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


// Login User Action (version without 'currying')
// ----------------------------------------------------------------------------
export const loginUserAction = (userData, history) => {

  return function (dispatch) {

    dispatch(clearErrors());

    // Call API endpoint
    axios
      .post('/api/users/login', userData)
      .then(res => {
        // Save to localStorage
        const { token } = res.data;

        // Set token to Local Storage (only stores strings)
        localStorage.setItem('jwtToken', token);

        // Set token to Auth header (function in 'utils' folder)
        setAuthToken(token);

        // Decode token to get user data in the token
        const decodedToken = jwt_decode(token);

        // Set current user
        dispatch(setCurrentUser(decodedToken));

        history.push('/dashboard');
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
}

// Set logged in user - dispatch to a reducer
export const setCurrentUser = (decodedToken) => {
  return {
    type: SET_CURRENT_USER,
    payload: decodedToken
  };
};


// Logout User Action (version without 'currying')
// ----------------------------------------------------------------------------
export const logoutUserAction = () => {

  return function (dispatch) {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');

    // Remove the Auth header for future requests
    setAuthToken(false);

    // Set current user to {} which will set 'isAuthenticated' to false
    dispatch(setCurrentUser({}));

    // redirect to login (uses 'window' object:  Navbar component has no history
    // in the 'props' because it is not a <Route> component. 
    // An alternative is to wrap Navbar with 'withRouter' but I prefer this)
    // NOT NEEDED since we created 'PrivateRoute' Component
    //window.location.href = "/login";
  }
};
