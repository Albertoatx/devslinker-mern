import { combineReducers } from 'redux';

// combine these reducers
import authReducer from './authReducer';
import errorReducer from './errorReducer';

const rootReducer = combineReducers({
  /* the authReducer will update info on the ‘auth’ property in Redux ‘state’ object */
  auth: authReducer,

  /* the errorReducer will update info on the ‘errors’ property in Redux ‘state’ object */
  errors: errorReducer,
});

export default rootReducer;

