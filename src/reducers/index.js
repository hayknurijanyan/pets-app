import userReducer from "./isUser";
import urlReducer from "./isUrl";
import userDataReducer from "./userData";
import userFriendsReducer from "./userFriends";
import { combineReducers } from "redux";
import sidebarLeftRenderReducer from "./sidebarLeftRender";

const allReducers = combineReducers({
  user: userReducer,
  isUrl: urlReducer,
  userData: userDataReducer,
  userFriends: userFriendsReducer,
  sideBarLeftRender: sidebarLeftRenderReducer,
});

export default allReducers;
