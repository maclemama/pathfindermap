import { combineReducers } from "@reduxjs/toolkit";

import { userReducer } from "./user/userSlice";
import { modalReducer } from "./modal/modalSlice";
import { startingPointlReducer } from "./startingPoint/startingPointSlice";
import { mapReducer } from "./map/mapSlice";
import { routeReducer } from "./route/routeSlice";

export const rootReducer = combineReducers({
	user: userReducer,
	modal: modalReducer,
	startingPoint: startingPointlReducer,
	map: mapReducer,
	route: routeReducer,
});
