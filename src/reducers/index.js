import userReducer from "./isUser";
import urlReducer from "./isUrl";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  user: userReducer,
  isUrl: urlReducer,
});

export default allReducers;
