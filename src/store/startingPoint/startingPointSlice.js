import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
	startingPoint: null,
};

export const startingPointSlice = createSlice({
	name: "startingPoint",
	initialState: INITIAL_STATE,
	reducers: {
		setStartingPoint(state, action) {
			state.startingPoint = action.payload;
		}
	},
});

export const { setStartingPoint } = startingPointSlice.actions;

export const startingPointlReducer = startingPointSlice.reducer;
