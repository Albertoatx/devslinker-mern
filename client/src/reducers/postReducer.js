import {
  POST_LOADING,
  ADD_POST,
  GET_POSTS,
} from '../actions/actionTypes';

const initialState = {
  post: {},
  posts: [],      /* a list of posts */
  loading: false,  /* while it is fetching a post i want this to be 'true' */
};

export default function (state = initialState, action) {

  switch (action.type) {

    case POST_LOADING:
      return {
        ...state,
        loading: true
      };

    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };

    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };

    default:
      return state;
  }
}