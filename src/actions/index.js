import { AUTH_STATE_CHANGE } from "../reducers/isUser";
import { PERSIST_USER_DATA } from "../reducers/userData";
import { USER_FRIENDS } from "../reducers/userFriends";
import { SIDEBAR_LEFT_RENDER } from "../reducers/sidebarLeftRender";

// sidebarLeftRender
export const sidebarLeftRender = () => {
  return {
    type: SIDEBAR_LEFT_RENDER,
  };
};

// userFriedsData
export const userFriendsAction = (friends) => {
  return {
    type: USER_FRIENDS,
    payload: friends,
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
