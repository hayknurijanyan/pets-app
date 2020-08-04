export const isLoggedAction = (email) => {
  return {
    type: "SIGN_IN",
    payload: email,
  };
};

export const emailAction = (email) => {
  return {
    type: "EMAIL",
    payload: email,
  };
};

export const passwordAction = (password) => {
  return {
    type: "PARRWORD",
    payload: password,
  };
};

export const userAction = (user) => {
  return {
    type: "USER",
    payload: user,
  };
};
