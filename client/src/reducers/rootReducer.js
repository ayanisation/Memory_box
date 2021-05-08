import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postReducer from "./postReducer";

export default combineReducers({
  posts: postReducer,
  auth: authReducer,
});
