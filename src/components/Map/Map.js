import "./Map.scss";

import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { selectStartingPoint } from "../../store/startingPoint/startingPointSelector";

import RouteSelector from "../RouteSelector/RouteSelector";
import markerPrimaryIcon from "../../assets/icons/marker-primary.svg";
import Routes from "../Routes/Routes";
import MapMarkerCurrent from "../MapMarkerCurrent/MapMarkerCurrent";
import MapRadius from "../MapRadius/MapRadius";

function Map({ mapRef }) {
	console.log("Map component re-render");
	const startingPoint = useSelector(selectStartingPoint);
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

	const onLoad = useCallback(
		(map) => {
			console.log("map load!")
			mapRef.current = map;
			setMapLoaded(true);
		},
		[mapRef]
	);

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

				<MapRadius startingPoint={startingPoint} />
			</GoogleMap>
			<RouteSelector />
		</section>
	);
}

export default Map;
