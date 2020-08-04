const initialState = {
  email: "",
  password: "",
  user: null,
};

const loggedReduser = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      const newState = { ...state };
      action.payload.email = newState.email;
      action.payload.password = newState.password;
      action.payload.user = newState.user;
      return newState;
    default:
      return state;
  }
};

export default loggedReduser;

export const emailReducer = (state = initialState, action) => {
  switch (action.type) {
    case "EMAIL":
      const newState = { ...state };
      action.payload.email = newState.email;
      return newState;
    default:
      return state;
  }
};

export const passwordReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PASSWORD":
      const newState = { ...state };
      action.payload.password = newState.password;
      return newState;
    default:
      return state;
  }
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER":
      const newState = { ...state };
      action.payload.user = newState.user;
      return newState;
    default:
      return state;
  }
};
