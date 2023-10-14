import "./Routes.scss";

import { DirectionsRenderer, PolylineF, MarkerF } from "@react-google-maps/api";
import { useDispatch } from "react-redux";

import { setSelectedRoute } from "../../store/route/routeSlice";
import { useShowRoute } from "../../scripts/mapHooks";

import MapMarkerWaypoint from "../MapMarkerWaypoint/MapMarkerWaypoint";
import RouteWalkingPolyline from "../RouteWalkingPolyline/RouteWalkingPolyline";

function Routes({ mapRef }) {
	const dispatch = useDispatch();
	const [places, directions, selectedRoute, isShowAllRoute, walkingDirection] =
		useShowRoute(mapRef);

	const handleRouteClick = (route_id) => {
		dispatch(setSelectedRoute(route_id));
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
					const routeID = direction.route_id;
					const isSelected = routeID === selectedRoute;
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
								path={direction.routes?.[0]?.overview_path}
								options={{
									strokeColor:
										isSelected || isShowAllRoute
											? direction.polylineColor
											: "transparent",
									strokeOpacity: 0.5,
									strokeWeight: 6,
								}}
								onClick={() => handleRouteClick(direction.route_id)}
							/>
						</div>
					);
				})}
			{walkingDirection && (
				<RouteWalkingPolyline walkingDirection={walkingDirection} mapRef={mapRef}/>
			)}
		</>
	);
}

export default Routes;
