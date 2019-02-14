import axios from 'axios';

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
} from './actionTypes';

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