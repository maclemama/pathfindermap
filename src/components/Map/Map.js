import "./Map.scss";

import { GoogleMap, MarkerF, CircleF } from "@react-google-maps/api";
import { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { selectStartingPoint } from "../../store/startingPoint/startingPointSelector";

import RouteSelector from "../RouteSelector/RouteSelector";
import markerPrimaryIcon from "../../assets/icons/marker-primary.svg";
import Routes from "../Routes/Routes";

function Map({
	routes,
	mapRadius,
	selectedRoute,
	setSelectedRoute,
	mapRef,
	setSelectedRouteDirection,
	selectedRouteDirection,
}) {
	console.log("Map component re-render")
	const startingPoint = useSelector(selectStartingPoint);
	const [directions, setDirections] = useState([]);
	const mapOptions = useMemo(
		() => ({
			mapId: "f6ca3c1a38d4ecfa",
			disableDefaultUI: true,
			clickableIcons: false,
			zoom: 17,
			tilt: 30,
		}),
		[]
	);

	const circleOptions = useMemo(
		() => ({
			strokeOpacity: 0.5,
			strokeWeight: 2,
			clickable: false,
			draggable: false,
			editable: false,
			visible: true,
			zIndex: 3,
			fillOpacity: 0.05,
			strokeColor: "#8BC34A",
			fillColor: "#8BC34A",
		}),
		[]
	);

	const onLoad = useCallback((map) => (mapRef.current = map), []);

	return (
		<section className="map">
			<GoogleMap
				mapContainerClassName="map__container"
				center={startingPoint}
				onLoad={onLoad}
				options={mapOptions}
			>
				<MarkerF position={startingPoint} icon={markerPrimaryIcon} />

				<Routes
					routes={routes}
					mapRef={mapRef}
					setSelectedRoute={setSelectedRoute}
					setSelectedRouteDirection={setSelectedRouteDirection}
					directions={directions}
					setDirections={setDirections}
					selectedRouteDirection={selectedRouteDirection}
				/>

				<CircleF
					center={startingPoint}
					radius={mapRadius}
					options={circleOptions}
				/>
			</GoogleMap>
			<RouteSelector
				routes={routes}
				directions={directions}
				selectedRoute={selectedRoute}
				setSelectedRoute={setSelectedRoute}
				setSelectedRouteDirection={setSelectedRouteDirection}
			/>
		</section>
	);
}

export default Map;
