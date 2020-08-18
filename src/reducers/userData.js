export const USER_DATA = "USER_DATA";

const initialState = {
  user: false,
  isUrl: "",
  userData: {},
};

const userDataReducer = (state = initialState.userData, action) => {
  switch (action.type) {
    case USER_DATA:
      return action.payload;
    default:
      return state;
  }
};

export default userDataReducer;
