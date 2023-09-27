import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
	routes: null,
	selectedRoute: null,
	places: null,
	directionConfigs: null,
	selectedDirection:null,
};

export const routeSlice = createSlice({
	name: "route",
	initialState: INITIAL_STATE,
	reducers: {
		setRoutesDirectionsPlaces(state, action) {
			state.routes = action.payload.routes;
			state.selectedRoute = null;
			state.places = action.payload.places;
			state.directionConfigs = action.payload.directionConfigs;
            state.selectedDirection = null;
		},
		setRoutes(state, action) {
			state.routes = action.payload;
		},
		setSelectedRoute(state, action) {
			state.selectedRoute = action.payload;
		},
		setDirectionConfig(state, action) {
			state.directionConfigs = action.directionConfigs;
		},
        setSelectedDirection(state, action) {
			state.selectedDirection = action.payload;
		},
		resetRoute(state) {
			state.routes = null;
			state.selectedRoute = null;
			state.places = null;
			state.directionConfigs = null;
            state.selectedDirection = null;
		},
	},
});

export const {
	setRoutes,
	setSelectedRoute,
	setDirectionConfig,
	resetRoute,
	setRoutesDirectionsPlaces,
    setSelectedDirection
} = routeSlice.actions;

export const routeReducer = routeSlice.reducer;
