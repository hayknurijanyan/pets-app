import { AUTH_STATE_CHANGE } from "../reducers/isUser";

export const isUserAction = (user) => {
  return {
    type: "SIGN_IN",
    payload: user,
  };
};
export const userDataAction = (userData) => {
  return {
    type: "USER_DATA",
    payload: userData,
  };
};

export const authStateChangeAction = (user) => ({
  type: AUTH_STATE_CHANGE,
  user,
});

export const fileUrlActionAsync = (string) => {
  return (dispatch) => {
    // Yay! Can invoke sync or async actions with `dispatch`
    dispatch(fileUrlAction(string));
  };
};

const fileUrlAction = (string) => {
  return {
    type: "URL",
    payload: string,
  };
};
