import axios from "axios";

export const generateDirection = async (directionConfigs) => {
	/* eslint-disable */
	const directionsService = new google.maps.DirectionsService();
	/* eslint-enable */

	const directionsData = await Promise.all(
		directionConfigs.map(async (route) => {
			const result = await directionsService.route({
				origin: route.origin,
				destination: route.destination,
				travelMode: "WALKING",
				waypoints: route.waypoints,
				optimizeWaypoints: false,
			});
			result.route_id = route.route_id;
			return result;
		})
	);
	return directionsData;
};

export const generateRoutes = (rawRoutes, startingPoint) => {
	const places = [];
	const directionConfigs = [];

	if (rawRoutes[0]) {
		// loop over routes and get all and set places and direction config data
		rawRoutes.forEach((route) => {
			const thisWaypoints = route.route_waypoints;
			const waypointsLatLng = [];
			let destination;
			rawRoutes.created_at = new Date(
				rawRoutes.created_at
			).toLocaleDateString();

			thisWaypoints.forEach((place, index) => {
				place.route_id = route.route_id;
				places.push(place);

				const latLng = { lat: place.latitude, lng: place.longitude };
				if (index + 1 === thisWaypoints.length) {
					destination = latLng;
				} else {
					waypointsLatLng.push({
						location: latLng,
					});
				}
			});

			const routeConfig = {
				origin: startingPoint,
				destination: destination,
				waypoints: waypointsLatLng,
				route_id: route.route_id,
			};
			directionConfigs.push(routeConfig);
		});

		return {
			routes: rawRoutes,
			places: places,
			directionConfigs: directionConfigs,
		};
	}
};

export const getRouteCommuniteTime = (routeDirection) => {
	let result = {};
	let walkingTime = 0;
	let walkingDistance = 0;

	routeDirection.routes[0].legs.forEach((waypoint) => {
		walkingDistance += waypoint.distance.value;
		walkingTime += waypoint.duration.value;
	});

	result.walking_distance = Number((walkingDistance / 1000).toFixed(1));
	result.walking_time = Number((walkingTime / 60).toFixed(0));

	return result;
};

export const getSavedRouteIDs = async (page) => {
	try {
		const token = localStorage.getItem("token");
		const { data } = await axios.get(
			`${process.env.REACT_APP_SERVER_URL}/route/page/${page}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
        return data;
	} catch (error) {
		throw error;
	}
};

export const getSavedRoutesDetails = async (routeIDs) => {
	try {
		const token = localStorage.getItem("token");
		const { data } = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/route/details`,
            {
                route: routeIDs,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        return data;
	} catch (error) {
		throw error;
	}
};
