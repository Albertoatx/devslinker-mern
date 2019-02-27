import axios from 'axios';

import {
  ADD_POST,
  GET_ERRORS,
  CLEAR_ERRORS,
  POST_LOADING,
  GET_POSTS,
  DELETE_POST,
  UPDATE_LIKE,
  GET_POST,
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

// Post loading (set the 'loading' state in Reducer BEFORE doing the request)
// ----------------------------------------------------------------------------
export const setPostLoading = () => {
  return {
    type: POST_LOADING /* no payload: we only let reducer know it is loading */
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


// Get All Posts Action (version without 'currying')
// ----------------------------------------------------------------------------
export const getAllPostsAction = () => {

  return function (dispatch) {

    dispatch(setPostLoading());

    axios.get('/api/posts')
      .then(res =>
        dispatch({
          type: GET_POSTS,
          payload: res.data
        })
      )
      // if there are no profiles we don't want an error (nothing wrong with that)
      .catch(err =>
        dispatch({
          type: GET_POSTS,
          payload: []      /* set the 'post.posts' redux state to null */
        })
      )
  }
}


// Get All Posts Action (version without 'currying')
// ----------------------------------------------------------------------------
export const getPostDetailAction = (postId) => {

  return function (dispatch) {

    dispatch(setPostLoading());

    axios.get(`/api/posts/${postId}`)
      .then(res =>
        dispatch({
          type: GET_POST,
          payload: res.data
        })
      )
      // if there is no post we don't want an error (nothing wrong with that)
      .catch(err =>
        dispatch({
          type: GET_POST,
          payload: {}      /* set the 'post.post' redux state */
          //payload: null     
        })
      )
  }
}


// Delete a Post Action (version without 'currying')
// ----------------------------------------------------------------------------
export const deletePostAction = postId => {

  return function (dispatch) {
    axios
      .delete(`/api/posts/${postId}`)
      .then(res =>
        dispatch({
          type: DELETE_POST,
          payload: postId /* send 'postId' because in our Reducer we want to delete the post locally */
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};


// Likes or Unlikes a post Action (version without 'currying')
// ----------------------------------------------------------------------------
export const likePostAction = postId => {

  return function (dispatch) {
    axios
      .post(`/api/posts/like/${postId}`)
      .then(res =>
        //dispatch(getAllPostsAction()) // overkill to load all posts because we liked a post
        dispatch({
          type: UPDATE_LIKE,
          payload: res.data   //pass in updated post
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};


// Add Post Action (version without 'currying')
// (We need the postId to add a Comment because we have an Array of Posts)
// ----------------------------------------------------------------------------
export const addCommentAction = function (postId, commentData, history) {

  return function (dispatch) {

    dispatch(clearErrors());

    // Call API endpoint (returns the updated post with the new comment)
    axios.post(`/api/posts/${postId}/comments`, commentData)
      //.then(res => history.push('/xxx')) in 'Register', 'addExperience'
      .then(res => {
        dispatch({
          type: GET_POST,     /* store the updated post in the redux state */
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