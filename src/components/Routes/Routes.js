import {
	MarkerF,
	DirectionsRenderer,
	InfoWindowF,
	PolylineF,
} from "@react-google-maps/api";
import { useEffect, useRef, useState, useCallback } from "react";
import markerSecondaryIcon from "../../assets/icons/marker-secondary.svg";
import "./Routes.scss";

function Routes({ routes, startingPoint, mapRef }) {
	const [directions, setDirections] = useState([]);
	const [places, setPlaces] = useState(null);
	const routeRef = useRef([]);

	const onLoad = useCallback((route) => {
		console.log(route);
		routeRef.current.push(route);
	}, []);

	const defaultPolyLineColors = [
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

	const defaultZIndex = [50, 50, 50, 50, 50, 50, 50, 50, 50, 50];
	const [polyLineColors, setPolyLineColors] = useState(defaultPolyLineColors);
	const [polyLineZIndex, setPolyLineZIndex] = useState(defaultZIndex);
	const [showMarker, setShowMarker] = useState([]);
	const centerMap = (markers) => {
		/* eslint-disable */
		const bounds = new google.maps.LatLngBounds();

		markers.forEach((marker) => {
			bounds.extend(new google.maps.LatLng(marker.latitude, marker.longitude));
		});
		bounds.extend(startingPoint);
		/* eslint-enable */
		mapRef.current.fitBounds(bounds);
	};

	useEffect(() => {
		if (routes) {
			if (routes[0]) {
				const newPlaces = [];
				const newDirections = [];
				const markerVisibility = [];

				// loop over routes and get all and set places and direction config data
				routes.forEach((route, routeNumber) => {
					const thisWaypoints = route.route_waypoints;
					const waypointsLatLng = [];
					let destination;
					markerVisibility.push(true);

					thisWaypoints.forEach((place, index) => {
						place.route_number = routeNumber;
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

				setShowMarker(markerVisibility);

				// set markers on the map
				setPlaces(newPlaces);

				// get direction data
				/* eslint-disable */
				const directionsService = new google.maps.DirectionsService();
				/* eslint-enable */
				const fetchDirections = async () => {
					const directionsData = await Promise.all(
						newDirections.map(async (route, index) => {
							const result = await directionsService.route({
								origin: route.origin,
								destination: route.destination,
								travelMode: "WALKING",
								waypoints: route.waypoints,
								optimizeWaypoints: false,
							});
							result.route_number = index;
							return result;
						})
					);
					// set polyline on the map
					setDirections(directionsData);
				};
				fetchDirections();

				// reposition map zoom to fit all the locations
				centerMap(newPlaces);
			}
		}
	}, [routes]);

	const handleRouteMouseOver = (e, index, direction) => {
		setPolyLineColors(
			polyLineColors.map((color, i) => {
				if (index !== i) {
					return "#FFFFFF";
				} else {
					return color;
				}
			})
		);

		setPolyLineZIndex(
			polyLineZIndex.map((zIndex, i) => {
				if (index !== i) {
					return 49;
				} else {
					return zIndex;
				}
			})
		);

		setShowMarker(
			showMarker.map((marker, i) => {
				if (direction.route_number !== i) {
					return false;
				} else {
					return marker;
				}
			})
		);

	};

	const handleRouteMouseOut = (e) => {
		setPolyLineColors(defaultPolyLineColors);
		setPolyLineZIndex(defaultZIndex);
		setShowMarker(showMarker.map((show) => true));
		centerMap(places);
	};

	const handleRouteClick = (e, direction) => {

		const directionBounds = direction.routes[0].bounds;

		/* eslint-disable */
		const bounds = new google.maps.LatLngBounds();
		bounds.extend(
			new google.maps.LatLng(
				directionBounds.getSouthWest().lat(),
				directionBounds.getSouthWest().lng()
			)
		);
		bounds.extend(
			new google.maps.LatLng(
				directionBounds.getNorthEast().lat(),
				directionBounds.getNorthEast().lng()
			)
		);
		/* eslint-enable */
		mapRef.current.fitBounds(bounds);
	};

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
							icon={markerSecondaryIcon}
							visible={showMarker[place.route_number]}
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
					console.log(direction.routes[0].overview_path);
					return (
						<>
							<DirectionsRenderer
								directions={direction}
								onLoad={onLoad}
								options={{
									markerOptions: {
										visible: false,
									},
									preserveViewport: true,
									suppressMarkers: true,
									suppressPolylines: true,
								}}
							/>
							<PolylineF
								path={direction.routes[0].overview_path}
								options={{
									strokeColor: polyLineColors[index],
									strokeOpacity: 0.5,
									strokeWeight: 6,
									zIndex: polyLineZIndex[index],
								}}
								onMouseOver={(e) => handleRouteMouseOver(e, index, direction)}
								onMouseOut={(e) => handleRouteMouseOut(e)}
								onClick={(e) => handleRouteClick(e, direction)}
							/>
						</>
					);
				})}
		</>
	);
}

export default Routes;
