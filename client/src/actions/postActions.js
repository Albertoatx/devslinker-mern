import axios from 'axios';

import {
  ADD_POST,
  GET_ERRORS,
  CLEAR_ERRORS,
} from './actionTypes';


/**
 * NOTES about 'redux-thunk'
 * 'redux-thunk' will allow us NOT to return an Action Creator object but to
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

// Add Post Action (version without 'currying')
// ----------------------------------------------------------------------------
export const addPostAction = function (postData, history) {

  return function (dispatch) {

    dispatch(clearErrors());

    // Call API endpoint
    axios.post('/api/posts', postData)
      //.then(res => history.push('/xxx')) in 'Register', 'addExperience'
      .then(res => {
        dispatch({
          type: ADD_POST,
          payload: res.data
        });

      }
      )
      .catch(err => {

        // If error, 'Thunk' resumes dispatch of the action to the 'errors' Reducer
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });

      }
      );
  }
}