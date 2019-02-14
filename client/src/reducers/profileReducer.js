import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE
} from '../actions/actionTypes';

const initialState = {
  profile: null,
  profiles: null, /* a list of profiles */
  loading: false  /* while it is fetching a profile i want this to be 'true' */
};

export default function (state = initialState, action) {

  switch (action.type) {

    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      }

    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null,
      }

    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      }

    default:
      return state;
  }
}