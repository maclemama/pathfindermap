import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
	radius: 3000,
	mapOptions: {
		mapId: "f6ca3c1a38d4ecfa",
		disableDefaultUI: true,
		clickableIcons: false,
		zoom: 17,
		tilt: 30,
	},
	circleOptions: {
		strokeOpacity: 0.5,
		strokeWeight: 2,
		clickable: false,
		draggable: false,
		editable: false,
		visible: true,
		zIndex: 3,
		fillOpacity: 0.05,
		strokeColor: "#8BC34A",
		fillColor: "#8BC34A",
	},
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
