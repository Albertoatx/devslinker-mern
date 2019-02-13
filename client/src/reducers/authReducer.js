import isEmpty from '../validation/is-empty';

import { SET_CURRENT_USER } from '../actions/actionTypes';

const initialState = {
  isAuthenticated: false,
  user: {}
};

// Dispatch 'actions' to this reducer (test actions with a 'switch')
const authReducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        // isAuth value will depend on wether the payload is empty or not
        isAuthenticated: !isEmpty(action.payload), //empty: true -> isAuth: false
        user: action.payload,
      }
    default:
      return state;
  }

};

export default authReducer;
