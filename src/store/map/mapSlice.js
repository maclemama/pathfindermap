import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
	radius: 3000
};

export const mapSlice = createSlice({
	name: "map",
	initialState: INITIAL_STATE,
	reducers: {
		setMapRadius(state, action) {
			state.radius = action.payload;
		},
	},
});

export const { setMapRadius } = mapSlice.actions;

export const mapReducer = mapSlice.reducer;
