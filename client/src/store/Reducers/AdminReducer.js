let initialState = {
  isAuthenticated: false,
  MainCats: [{}],
  // UserSignUp: { data: {} },
  // cartInfo:[],
  // checkout:{},
};

const adminReducer = (state = initialState, action) => {
  let newState = JSON.parse(JSON.stringify(state));

  if (action.type == "get_Cats") {
    newState.MainCats = action.payload;
    // newState.UserSignUp.data = true;
    return newState;
  }
  if (action.type == "ADMIN_LOGIN") {
    newState.isAuthenticated = true;
    return newState;
  }

  //  else if (action.type == "USER_LOGIN_FAILED") {
  //     newState.UserSignUp.data = {failed:true}
  //     // newState.inProcess = false;
  //     return newState;
  // }
  return state;
};

export default adminReducer;
