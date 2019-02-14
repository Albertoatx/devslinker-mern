import { GET_ERRORS, CLEAR_ERRORS } from '../actions/actionTypes';

const initialState = {};

export default function (state = initialState, action) {

  switch (action.type) {

    case GET_ERRORS:
      return action.payload; // the payload is going to include the errors object

    case CLEAR_ERRORS:
      return {};

    default:
      return state;
  }
}