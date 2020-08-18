const URl = "URL";

const initialState = {
  user: false,
  isUrl: "",
};

const urlReducer = (state = initialState.isUrl, action) => {
  switch (action.type) {
    case URl:
      return {
        state: action.payload,
      };
    default:
      return state;
  }
};

export default urlReducer;
