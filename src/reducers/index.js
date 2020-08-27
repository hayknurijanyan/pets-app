import userReducer from "./isUser";
import urlReducer from "./isUrl";
import { combineReducers } from "redux";
import userDataReducer from "./userData";
import themeSelectReducer from "./themeSelect";

const allReducers = combineReducers({
  user: userReducer,
  isUrl: urlReducer,
  userData: userDataReducer,
  themeSelect: themeSelectReducer,
});

export default allReducers;
