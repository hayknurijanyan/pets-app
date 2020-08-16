const URl = "URL";

const urlReducer = (state = "", action) => {
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
