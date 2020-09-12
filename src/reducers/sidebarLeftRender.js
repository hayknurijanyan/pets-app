export const SIDEBAR_LEFT_RENDER = "SIDEBAR_LEFT_RENDER";
const initialState = {
  user: false,
  isUrl: "",
  userData: {},
  friends: [],
  toRender: false,
};

const sidebarLeftRenderReducer = (state = initialState.toRender, action) => {
  switch (action.type) {
    case SIDEBAR_LEFT_RENDER:
      return !state;
    default:
      return state;
  }
};

export default sidebarLeftRenderReducer;
