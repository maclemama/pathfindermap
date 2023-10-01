import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
	showRouteDetailsPanel: false,
	showRouteControlMenu: true,
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
		resetLayout(state) {
			state.showRouteDetailsPanel = false;
			state.showRouteControlMenu = true;
		},
	},
});

export const {
	setShowRouteControlMenu,
	setShowRouteDetailsPanel,
	resetLayout,
} = layoutSlice.actions;

export const layoutReducer = layoutSlice.reducer;
