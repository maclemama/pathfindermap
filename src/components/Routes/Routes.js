import "./Routes.scss";

import { DirectionsRenderer, PolylineF } from "@react-google-maps/api";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectStartingPoint } from "../../store/startingPoint/startingPointSelector";
import {
	selectRoutes,
	selectPlaces,
	selectDirectionConfigs,
	selectSelectedRoute,
} from "../../store/route/routeSelector";
import {
	setSelectedRoute,
	setSelectedDirection,
} from "../../store/route/routeSlice";
import {
	generateDirection,
	getDirectionDetails,
} from "../../scripts/routeUtils";

import MapMarkerWaypoint from "../MapMarkerWaypoint/MapMarkerWaypoint";

function Routes({ mapRef }) {
	const dispatch = useDispatch();
	const startingPoint = useSelector(selectStartingPoint);
	const routes = useSelector(selectRoutes);
	const places = useSelector(selectPlaces);
	const directionConfigs = useSelector(selectDirectionConfigs);
	const selectedRoute = useSelector(selectSelectedRoute);
	const [showMarker, setShowMarker] = useState([]);
	const [directions, setDirections] = useState([]);

	const defaultPolyLineColors = useMemo(
		() => [
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
		],
		[]
	);

	const [polyLineColors, setPolyLineColors] = useState(defaultPolyLineColors);

	const defaultZIndex = useMemo(
		() => [50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
		[]
	);

	const [polyLineZIndex, setPolyLineZIndex] = useState(defaultZIndex);

	const centerMap = useCallback(
		(markers) => {
			/* eslint-disable */
			const bounds = new google.maps.LatLngBounds();

			markers.forEach((marker) => {
				bounds.extend(
					new google.maps.LatLng(marker.latitude, marker.longitude)
				);
			});
			bounds.extend(startingPoint);
			/* eslint-enable */
			mapRef.current.fitBounds(bounds);
			mapRef.current.setTilt(30);
		},
		[mapRef, startingPoint]
	);

	const showSelectedRoute = useCallback(
		(index, direction) => {
			setPolyLineColors(
				polyLineColors.map((color, i) => {
					if (index !== i) {
						return "#FFFFFF";
					} else {
						return defaultPolyLineColors[i];
					}
				})
			);

			setPolyLineZIndex(
				polyLineZIndex.map((zIndex, i) => {
					if (index !== i) {
						return 49;
					} else {
						return defaultZIndex[i];
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
		},
		[
			defaultPolyLineColors,
			defaultZIndex,
			polyLineColors,
			polyLineZIndex,
			showMarker,
		]
	);

	const showAllRoute = useCallback(() => {
		setPolyLineColors(defaultPolyLineColors);
		setPolyLineZIndex(defaultZIndex);
		let newMarkerVisibility = {};
		Object.keys(showMarker).forEach(
			(routeID) => (newMarkerVisibility[routeID] = true)
		);
		setShowMarker(newMarkerVisibility);
		if (places) {
			centerMap(places);
		}
	}, [centerMap, defaultPolyLineColors, defaultZIndex, places]);

	const changeMapZoom = useCallback(
		(direction) => {
			// set selected route to display route details in route details panel

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
			mapRef.current.setTilt(30);
		},
		[mapRef]
	);

	const handleRouteClick = (route_id) => {
		dispatch(setSelectedRoute(route_id));
	};
	useEffect(() => {
		if (routes) {
			if (routes[0]) {
				const markerVisibility = {};

				routes.forEach((route) => {
					markerVisibility[String(route.route_id)] = true;
				});
				setShowMarker(markerVisibility);

				// get direction data
				const fetchDirections = async () => {
					const directionsData = await generateDirection(directionConfigs);
					setDirections(directionsData);
				};
				fetchDirections();

				// reposition map zoom to fit all the locations
				centerMap(places);
			}
		}
	}, [routes, centerMap, setDirections]);

	useEffect(() => {
		if (selectedRoute) {
			const directionIdex = directions
				.map((d) => d.route_id)
				.indexOf(selectedRoute);
			const selectedDirection = directions[directionIdex];
			const routeCommuteTime = getDirectionDetails(selectedDirection);

			dispatch(setSelectedDirection(routeCommuteTime));
			changeMapZoom(selectedDirection);
			showSelectedRoute(directionIdex, selectedDirection);
		} else {
			showAllRoute();
		}
	}, [selectedRoute, directions, showAllRoute, changeMapZoom]);

	return (
		<>
			{places &&
				places.map((place, index) => {
					const location = {
						lat: place.latitude,
						lng: place.longitude,
					};
					return (
						<MapMarkerWaypoint
							position={location}
							map={mapRef.current}
							placeData={place}
							key={index}
						/>
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
								onClick={() => handleRouteClick(direction.route_id)}
							/>
						</div>
					);
				})}
		</>
	);
}

export default Routes;
