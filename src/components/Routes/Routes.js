import {
	MarkerF,
	DirectionsRenderer,
	InfoWindowF,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import markerSecondaryIcon from "../../assets/icons/marker-secondary.svg";
import "./Routes.scss";

function Routes({ routes, startingPoint }) {
	const [directions, setDirections] = useState([]);
	const [places, setPlaces] = useState(null);
	const randomColors = [
		"#FF5733",
		"#8A2BE2",
		"#00FF7F",
		"#FFD700",
		"#FF1493",
		"#32CD32",
		"#9400D3",
		"#00BFFF",
		"#FF4500",
		"#4B0082",
	];

	useEffect(() => {
		if (routes) {
			if (routes[0]) {
				let newPlaces = [];
				let newDirections = [];
				routes.forEach((route) => {
					const thisWaypoints = route.route_waypoints;
					const waypointsLatLng = [];
					let destination;
					thisWaypoints.forEach((place, index) => {
						newPlaces.push(place);
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
					};
					newDirections.push(routeConfig);
				});
				setPlaces(newPlaces);

				/* eslint-disable */
				const directionsService = new google.maps.DirectionsService();
				/* eslint-enable */

				const fetchDirections = async () => {
					const directionsData = await Promise.all(
						newDirections.map(async (route) => {
							const result = await directionsService.route({
								origin: route.origin,
								destination: route.destination,
								travelMode: "WALKING",
								waypoints: route.waypoints,
								optimizeWaypoints: false,
							});
							return result;
						})
					);
					setDirections(directionsData);
				};
				fetchDirections();
			}
		}
	}, [routes]);

	return (
		<>
			{places &&
				places.map((place) => {
					const location = {
						lat: place.latitude,
						lng: place.longitude,
					};
					return (
						<MarkerF
							position={location}
							// onClick={() =>
							// 	fetchDirections(startingPoint, location)
							// }
							icon={markerSecondaryIcon}
						>
							<InfoWindowF position={location}>
								<div>{place.name}</div>
							</InfoWindowF>
						</MarkerF>
					);
				})}
			{directions &&
				directions[0] &&
				directions.map((direction, index) => {
					return (
						<DirectionsRenderer
							directions={direction}
							options={{
								polylineOptions: {
									zIndex: 100,
									strokeColor: randomColors[index],
									strokeWeight: 5,
								},
								markerOptions: {
									visible: false,
								},
							}}
						/>
					);
				})}
		</>
	);
}

export default Routes;
