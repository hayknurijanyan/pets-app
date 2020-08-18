export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const AUTH_STATE_CHANGE = "AUTH_STATE_CHANGE";

const initialState = {
  user: false,
  isUrl: "",
};

const userReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case SIGN_IN:
      return action.payload;
    case SIGN_OUT:
      return action.payload;
    case AUTH_STATE_CHANGE:
      return action.user;
    default:
      return state;
  }
};

export default userReducer;
