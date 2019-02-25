import {
  POST_LOADING,
  ADD_POST,
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

    default:
      return state;
  }
}