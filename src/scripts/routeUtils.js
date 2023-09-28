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
	let copyRoutes = [...rawRoutes];

	if (copyRoutes[0]) {
		// loop over routes and get all and set places and direction config data
		copyRoutes.forEach((route) => {
			const thisWaypoints = route.route_waypoints;
			const waypointsLatLng = [];
			let destination;
			copyRoutes.created_at = new Date(
				copyRoutes.created_at
			).toLocaleDateString();

			thisWaypoints.forEach((place, index) => {
				places.push({
					route_id: route.route_id,
					...place,
				});

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
			routes: copyRoutes,
			places: places,
			directionConfigs: directionConfigs,
		};
	}
};

export const getDirectionDetails = (routeDirection) => {
	let result = {
		polyline: routeDirection.routes[0].overview_polyline,
		summary: routeDirection.routes[0].summary,
	};
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

export const getSavedRouteIDs = async (mode, page, query) => {
	try {
		let url = `${process.env.REACT_APP_SERVER_URL}/route`;
		if (mode === "page") {
			url += `/page/${page}`;
		}
		if (mode === "query") {
		    
			url += `?search=${encodeURIComponent(query)}`;
		}
		const token = localStorage.getItem("token");
		const { data } = await axios.get(url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

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
		);
		return data;
	} catch (error) {
		throw error;
	}
};

export const postSaveRoute = async (rawPayload) => {
	try {
		const token = localStorage.getItem("token");
		const {
			route_id,
			longitude,
			latitude,
			walking_distance,
			walking_time,
			address,
			placeId,
			route_waypoints,
			polyline,
			summary,
		} = rawPayload;
		const apiPath = `${process.env.REACT_APP_SERVER_URL}/route`;
		const payload = {
			id: route_id,
			place_id: placeId,
			route_waypoints,
			longitude,
			latitude,
			walking_distance,
			walking_time,
			address,
			polyline,
			summary,
		};

		payload.user_saved = true;

		if (!token) {
			throw Error("Please login user account to save path.");
		}
		const result = await axios.post(apiPath, payload, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return result.data;
	} catch (error) {
		const { response } = error;
		if (response) {
			throw response.data;
		} else {
			throw error;
		}
	}
};

export const deleteSavedRoute = async (route_id) => {
	try {
		const token = localStorage.getItem("token");
		const payload = {
			route_id: route_id,
		};
		const apiPath = `${process.env.REACT_APP_SERVER_URL}/route`;
		const result = await axios.delete(apiPath, {
			data: payload,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return result.data;
	} catch (error) {
		const { response } = error;
		if (response) {
			throw response.data;
		} else {
			throw error;
		}
	}
};
