import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
	radius: 3000,
	mapZoom: 17,
	navigationMode: false,
	navigationModeLoading: false,
};

export const mapSlice = createSlice({
	name: "map",
	initialState: INITIAL_STATE,
	reducers: {
		setMapRadius(state, action) {
			state.radius = action.payload;
		},
		setNavigationMode(state, action) {
			state.navigationMode = action.payload;
		},
		setNavigationModeLoading(state, action) {
			state.navigationModeLoading = action.payload;
		},
		setMapZoom(state, action) {
			state.mapZoom = action.payload;
		},
	},
});

export const {
	setMapRadius,
	setNavigationMode,
	setNavigationModeLoading,
	setMapZoom,
} = mapSlice.actions;

export const mapReducer = mapSlice.reducer;
