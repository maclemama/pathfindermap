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
	},
});

export const { setShowRouteControlMenu,setShowRouteDetailsPanel } = layoutSlice.actions;

export const layoutReducer = layoutSlice.reducer;
