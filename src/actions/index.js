export const isUserAction = (user) => {
  return {
    type: "SIGN_IN",
    payload: user,
  };
};
