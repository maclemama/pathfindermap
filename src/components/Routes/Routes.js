import {
	MarkerF,
	DirectionsRenderer,
	InfoWindowF,
	PolylineF,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import markerSecondaryIcon from "../../assets/icons/marker-secondary.svg";
import "./Routes.scss";

function Routes({ routes, startingPoint, mapRef, setSelectedRoute }) {
	const [directions, setDirections] = useState([]);
	const [places, setPlaces] = useState(null);
	const [showMarker, setShowMarker] = useState([]);

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

	const [polyLineColors, setPolyLineColors] = useState(defaultPolyLineColors);

	const defaultZIndex = [50, 50, 50, 50, 50, 50, 50, 50, 50, 50];
	const [polyLineZIndex, setPolyLineZIndex] = useState(defaultZIndex);

	const centerMap = (markers) => {
		/* eslint-disable */
		const bounds = new google.maps.LatLngBounds();

		markers.forEach((marker) => {
			bounds.extend(new google.maps.LatLng(marker.latitude, marker.longitude));
		});
		bounds.extend(startingPoint);
		/* eslint-enable */
		mapRef.current.fitBounds(bounds);
		mapRef.current.setTilt(30)
	};

	useEffect(() => {
		if (routes) {
			if (routes[0]) {
				const newPlaces = [];
				const newDirections = [];
				const markerVisibility = {};

				// loop over routes and get all and set places and direction config data
				routes.forEach((route) => {
					const thisWaypoints = route.route_waypoints;
					const waypointsLatLng = [];
					let destination;
					markerVisibility[String(route.route_id)] = true;
					thisWaypoints.forEach((place, index) => {
						place.route_id = route.route_id;
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
						route_id: route.route_id,
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
							result.route_id = route.route_id;
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
		let newMarkerVisibility = {};

		Object.keys(showMarker).forEach((routeID) => {
			if (String(direction.route_id) !== routeID) {
				newMarkerVisibility[routeID] = false;
			} else {
				newMarkerVisibility[routeID] = true;
			}
		});
		setShowMarker(newMarkerVisibility);
	};

	const handleRouteMouseOut = (e) => {
		setPolyLineColors(defaultPolyLineColors);
		setPolyLineZIndex(defaultZIndex);
		let newMarkerVisibility = {};
		Object.keys(showMarker).forEach(
			(routeID) => (newMarkerVisibility[routeID] = true)
		);
		setShowMarker(newMarkerVisibility);
	};

	const handleRouteDoubleClick = (e) => {
		centerMap(places);
	};

	const handleRouteClick = (e, direction) => {
		// set selected route to display route details in route details panel
		setSelectedRoute(direction.route_id);

		// handle map bound
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
		mapRef.current.setTilt(30)
	};

	return (
		<>
			{places &&
				places.map((place, index) => {
					const location = {
						lat: place.latitude,
						lng: place.longitude,
					};
					return (
						<MarkerF
							position={location}
							icon={markerSecondaryIcon}
							visible={showMarker[String(place.route_id)]}
							key={index}
						>
							<div className="infowindow" visible={false}>
								<InfoWindowF position={location}>
									<div>{place.name}</div>
								</InfoWindowF>
							</div>
						</MarkerF>
					);
				})}
			{directions &&
				directions[0] &&
				directions.map((direction, index) => {
					return (
						<div className="routes-wrapper" key={index}>
							<DirectionsRenderer
								directions={direction}
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
								onMouseOut={handleRouteMouseOut}
								onClick={(e) => handleRouteClick(e, direction)}
								onDblClick={handleRouteDoubleClick}
							/>
						</div>
					);
				})}
		</>
	);
}

export default Routes;
