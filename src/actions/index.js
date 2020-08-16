export const isUserAction = (user) => {
  return {
    type: "SIGN_IN",
    payload: user,
  };
};

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
