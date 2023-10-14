import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
	radius: 3000,
	mapZoom: 17,
	navigationMode: false,
	navigationModeLoading: false,
	walkingMode: false,
	walkingModeLoading: false,
	walkingCurrentDestination: {
		position: null,
		isFinalStop: null,
		positionIndex:null,
		isArrived:null
	},
	walkingNextDestinationDistance: null,
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
		setWalkingMode(state, action) {
			state.walkingMode = action.payload;
		},
		setWalkingModeLoading(state, action) {
			state.walkingModeLoading = action.payload;
		},
		setWalkingCurrentDestination(state, action) {
			state.walkingCurrentDestination = action.payload;
		},
		setWalkingNextDestinationDistance(state, action){
			state.walkingNextDestinationDistance = action.payload;
		}
	},
});

export const {
	setMapRadius,
	setNavigationMode,
	setNavigationModeLoading,
	setMapZoom,
	setWalkingMode,
	setWalkingModeLoading,
	setWalkingCurrentDestination,
	setWalkingNextDestinationDistance
} = mapSlice.actions;

export const mapReducer = mapSlice.reducer;
