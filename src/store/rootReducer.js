import { combineReducers } from "@reduxjs/toolkit";

import { userReducer } from "./user/userSlice";
import { modalReducer } from "./modal/modalSlice";
import { startingPointlReducer } from "./startingPoint/startingPointSlice";

export const rootReducer = combineReducers({
	user: userReducer,
	modal: modalReducer,
	startingPoint: startingPointlReducer,
});
