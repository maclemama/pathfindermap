import { combineReducers } from "@reduxjs/toolkit";

import { userReducer } from "./user/userSlice";
import { modalReducer } from "./modal/modalSlice";

export const rootReducer = combineReducers({
	user: userReducer,
	modal: modalReducer,
});
