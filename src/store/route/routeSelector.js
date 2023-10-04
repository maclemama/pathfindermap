export function selectRoutes(state) {
	return state.route.routes;
}

export function selectPlaces(state) {
	return state.route.places;
}

export function selectDirectionConfigs(state) {
	return state.route.directionConfigs;
}

export function selectSelectedRoute(state) {
	return state.route.selectedRoute;
}

export function selectSelectedDirection(state) {
	return state.route.selectedDirection;
}

export function selectHighlightedPlace(state) {
	return state.route.highlightedPlace;
}

export function selectSelectedPlaces(state) {
	const selectedRoute = state.route.selectedRoute;

	if (selectedRoute) {
		return state.route.places
			.filter((place) => selectedRoute === place.route_id)
			.map((place) => place.route_id + place.place_id);
	} else {
		return state.route.places.map((place) => place.route_id + place.place_id);
	}
}
