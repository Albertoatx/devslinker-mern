import { createStore, applyMiddleware, compose } from 'redux';

// middleware
import thunk from 'redux-thunk';

// rootReducer
import rootReducer from './reducers/rootReducer';

// initial Redux store state
const initialState = {};

// Advanced store setup (if we use middleware and enhancers)  
// (when the extension is not installed, we’re using Redux compose here) 
const middleware = [thunk];
const composeEnhancers = typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) // object can specify extension options
  : compose;

// createStore
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

// console.log(store.getState());

export default store;