import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import { rootReducer } from "./rootReducer";

const middleWares = [
	process.env.REACT_APP_ENV === "DEVELOPMENT" && logger,
].filter(Boolean);

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(middleWares),
});
