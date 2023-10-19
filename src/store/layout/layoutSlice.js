import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
	showRouteDetailsPanel: false,
	showRouteControlMenu: false,
};

export const layoutSlice = createSlice({
	name: "layout",
	initialState: INITIAL_STATE,
	reducers: {
		setShowRouteDetailsPanel(state, action) {
			state.showRouteDetailsPanel = action.payload;
		},
		setShowRouteControlMenu(state, action) {
			state.showRouteControlMenu = action.payload;
		},
		resetLayout(state, action) {
			state.showRouteDetailsPanel = false;
			state.showRouteControlMenu = !action.payload;
		},
	},
});

export const {
	setShowRouteControlMenu,
	setShowRouteDetailsPanel,
	resetLayout,
} = layoutSlice.actions;

export const layoutReducer = layoutSlice.reducer;
