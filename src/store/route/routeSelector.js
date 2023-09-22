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
