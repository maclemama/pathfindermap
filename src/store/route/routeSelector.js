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
	const walkingInfo = state.route.walkingInfo;
	const selectedRoute = state.route.selectedRoute;
	let result = null;
	if (walkingInfo && selectedRoute) {
		walkingInfo.forEach((route) => {
			if (route.route_id === selectedRoute) result = route;
		});
	}
	return result;
}

export function selectHighlightedPlace(state) {
	return state.route.highlightedPlace;
}

export function selectWalkingInfo(state) {
	return state.route.walkingInfo;
}
