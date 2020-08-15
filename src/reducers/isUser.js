const SIGN_IN = "SIGN_IN";

const userReduser = (state = null, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userReduser;
