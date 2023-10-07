import "./Map.scss";

import { GoogleMap, MarkerF, CircleF } from "@react-google-maps/api";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { selectStartingPoint } from "../../store/startingPoint/startingPointSelector";
import { selectMapRadius } from "../../store/map/mapSelector";

import RouteSelector from "../RouteSelector/RouteSelector";
import markerPrimaryIcon from "../../assets/icons/marker-primary.svg";
import Routes from "../Routes/Routes";
import MapMarkerCurrent from "../MapMarkerCurrent/MapMarkerCurrent";

function Map({ mapRef, isLoaded }) {
	console.log("Map component re-render");
	const startingPoint = useSelector(selectStartingPoint);
	const mapRadius = useSelector(selectMapRadius);
	const [mapLoaded, setMapLoaded] = useState(false);


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

	const onLoad = useCallback(
		(map) => {
			mapRef.current = map;
			setMapLoaded(true);
		},
		[mapRef]
	);

	if (!isLoaded) {
		return;
	}

	return (
		<section className="map">
			<GoogleMap
				mapContainerClassName="map__container"
				center={startingPoint}
				onLoad={onLoad}
				options={mapOptions}
			>
				<MarkerF position={startingPoint} icon={markerPrimaryIcon} />

				{mapLoaded && <MapMarkerCurrent map={mapRef.current} />}

				<Routes mapRef={mapRef} />

				<CircleF
					center={startingPoint}
					radius={mapRadius}
					options={circleOptions}
				/>
			</GoogleMap>
			<RouteSelector />
		</section>
	);
}

export default Map;
