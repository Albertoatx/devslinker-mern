import axios from 'axios';

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  CLEAR_ERRORS,
} from './actionTypes';

import { logoutUserAction } from './authActions';

/**
 * NOTES about 'redux-thunk'
 * 'redux-thunk' will allow us NOT to return an Action Creator object but to
 *  return a function and inside that function we can:
 *  1) stop/halt the dispatch
 *  2) perform an async request
 *  3) resume dispatch and pass it to the reducer when request completed
 *  -------------------------------------------------------------------------*/


// Profile loading (set the 'loading' state in Reducer BEFORE doing the request)
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING  /* no payload: we only let reducer know it is loading */
  };
};

// Clear profile (used when we logout to set 'profile' state to null)
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

// Clear errors (used mainly when submitting forms)
// ---------------------------------------------------------------------------
const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};


// Get Current Profile Action (version without 'currying')
// ----------------------------------------------------------------------------
export const getCurrentProfileAction = () => {

  return function (dispatch) {

    dispatch(setProfileLoading());

    axios.get('/api/profile')
      .then(res =>
        dispatch({
          type: GET_PROFILE,
          payload: res.data
        })
      )
      // if there is no profile we don't want an error (nothing wrong with that)
      .catch(err =>
        dispatch({
          type: GET_PROFILE,
          payload: {}
        })
      )
  }
}

// Create Profile Action (version without 'currying')
// ----------------------------------------------------------------------------
export const createProfileAction = (profileData, history) => {

  return function (dispatch) {

    dispatch(clearErrors());

    axios
      .post('/api/profile', profileData)
      .then(res => history.push('/dashboard'))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// Delete User and Profile Action - (version without 'currying')
// ----------------------------------------------------------------------------
export const deleteUserAndProfileAction = () => {

  return function (dispatch) {

    if (window.confirm('Are you sure? This can NOT be undone!')) {
      axios
        .delete('/api/profile')
        .then(res =>
          /* does NOT delete Token from Local storage
          dispatch({
            type: SET_CURRENT_USER,
            payload: {}
          }) */

          // deletes token from local storage + dispatches SET_CURRENT_USER
          dispatch(logoutUserAction())
        )
        .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        );
    }
  }
};

// Add Experience Action (version without 'currying') 
//  (almost identical to createProfileAction)
// ----------------------------------------------------------------------------
export const addExperienceAction = (experienceData, history) => {

  return function (dispatch) {

    dispatch(clearErrors());

    axios
      .post('/api/profile/experience', experienceData)
      .then(res => history.push('/dashboard'))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// Add Education Action (version without 'currying') 
//  (almost identical to createProfileAction)
// ----------------------------------------------------------------------------
export const addEducationAction = (educationData, history) => {

  return function (dispatch) {

    dispatch(clearErrors());

    axios
      .post('/api/profile/education', educationData)
      .then(res => history.push('/dashboard'))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// Delete Experience Action (version without 'currying') 
//  ()
// ----------------------------------------------------------------------------
export const deleteExperienceAction = (expId) => {

  return function (dispatch) {

    axios
      .delete(`/api/profile/experience/${expId}`)
      .then(res => dispatch({
        type: GET_PROFILE,
        payload: res.data /* the profile without the deleted experience */
      }))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};
