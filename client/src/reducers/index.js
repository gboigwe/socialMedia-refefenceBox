import { combineReducers } from "redux";

import authReducer from "./AuthReducer.js";
import postReducer from "./PostReducer.js";
import chatReducer from "./ChatUserReducer.js"

export const reducers = combineReducers({authReducer, postReducer, chatReducer})