import loggedReducer, {
  passwordReducer,
  emailReducer,
  userReducer,
} from "./isLogged";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  isLogged: loggedReducer,
  passwordReducer,
  emailReducer,
  userReducer,
});

export default allReducers;
