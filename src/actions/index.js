import { AUTH_STATE_CHANGE } from "../reducers/isUser";
import { PERSIST_USER_DATA } from "../reducers/userData";

//// theme select actions
export const darkSelectActionOne = (theme) => {
  return {
    type: "DARK_SELECT_ONE",
    payload: theme,
  };
};
export const darkSelectActionTwo = (theme) => {
  return {
    type: "DARK_SELECT_TWO",
    payload: theme,
  };
};

export const themeSelectActionOne = (theme) => {
  return {
    type: "THEME_SELECT_ONE",
    payload: theme,
  };
};

export const themeSelectActionTwo = (theme) => {
  return {
    type: "THEME_SELECT_TWO",
    payload: theme,
  };
};

/// isUserAction

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
/// userdataAction
export const persistUserDataAction = (userData) => {
  return {
    type: PERSIST_USER_DATA,
    payload: userData,
  };
};
// authstagechange action
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

export const fileUrlAction = (string) => {
  return {
    type: "URL",
    payload: string,
  };
};
