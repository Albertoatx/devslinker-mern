import {
  POST_LOADING,
  ADD_POST,
  GET_POSTS,
  DELETE_POST,
  UPDATE_LIKE,
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

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload) //delete post locally
      };

    case UPDATE_LIKE:
      return {
        ...state,
        // update the posts array updating ONLY the liked/unliked post.
        posts: state.posts.map(post => {
          if (post._id === action.payload._id) {
            return action.payload;
          } else {
            return post;
          }
        })
      };

    default:
      return state;
  }
}