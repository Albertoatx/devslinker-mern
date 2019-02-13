import { GET_ERRORS } from '../actions/actionTypes';

const initialState = {};

export default function (state = initialState, action) {

  switch (action.type) {

    case GET_ERRORS:
      return action.payload; // the payload is going to include the errors object

    default:
      return state;
  }
}