import userReducer from "./isUser";
import urlReducer from "./isUrl";
import { combineReducers } from "redux";
import userDataReducer from "./userData";

const allReducers = combineReducers({
  user: userReducer,
  isUrl: urlReducer,
  userData: userDataReducer,
});

export default allReducers;
