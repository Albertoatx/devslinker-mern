const initialState = {
  isAuthenticated: false,
  user: {}
};

// Dispatch 'actions' to this reducer (test actions with a 'switch')
const authReducer = (state = initialState, action) => {

  switch (action.type) {
    default:
      return state;
  }

};

export default authReducer;
