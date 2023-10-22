export const selectMapRadius = (state) => state.map.radius;
export const selectNavigationMode = (state) => state.map.navigationMode;
export const selectNavigationModeLoading = (state) =>
	state.map.navigationModeLoading;
export const selectMapZoom = (state) => state.map.mapZoom;
export const selectWalkingMode = (state) => state.map.walkingMode;
export const selectWalkingModeLoading = (state) => state.map.walkingModeLoading;
export const selectWalkingCurrentDestination = (state) =>
	state.map.walkingCurrentDestination;
export const selectWalkingNextDestinationDistance = (state) =>
	state.map.walkingNextDestinationDistance;
export const selectAllowGeolocation = (state) => state.map.allowedGeolocation;
