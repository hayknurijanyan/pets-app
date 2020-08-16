const SIGN_IN = "SIGN_IN";

const userReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
