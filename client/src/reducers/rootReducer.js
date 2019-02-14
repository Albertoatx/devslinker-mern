import { combineReducers } from 'redux';

// combine these reducers
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';

const rootReducer = combineReducers({
  /* the authReducer will update info on the ‘auth’ property in Redux ‘state’ object */
  auth: authReducer,

  /* the errorReducer will update info on the ‘errors’ property in Redux ‘state’ object */
  errors: errorReducer,

  /* the profile will update info on the ‘profile’ property in Redux ‘state’ object */
  profile: profileReducer,
});

export default rootReducer;

