import axios from 'axios';

import { GET_ERRORS } from './actionTypes';

/** 
 * NOTES about 'redux-thunk'
 * 'redux-thunk' will allow us NOT to return an Action Creator but to
 *  return a function and inside that function we can:
 *  1) stop/halt the dispatch 
 *  2) perform an async request
 *  3) resume dispatch and pass it to the reducer when request completed
 *  -------------------------------------------------------------------------*/


// Register User Action (version without 'currying')
// ----------------------------------------------------------------------------
export const registerUserAction = function (userData, history) {

  return function (dispatch) {
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


