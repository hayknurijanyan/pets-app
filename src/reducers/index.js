import userReducer from "./isUser";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  isUser: userReducer,
});

export default allReducers;
