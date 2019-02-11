import { combineReducers } from 'redux';

// combine these reducers
import authReducer from './authReducer';

const rootReducer = combineReducers({
  /* the authReducer will update info on the ‘auth’ property inside ‘state’ object */
  auth: authReducer
});

export default rootReducer;

