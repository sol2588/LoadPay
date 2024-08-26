const initialState = {
  user: {
    isLoggedIn: false,
    userName: "",
    userId: "",
    accessToken: "",
  },
};

// reducer
const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
        userId: action.payload.id,
        accessToken: action.payload.token,
      };
    case "LOG_OUT":
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

export default userReducer;
