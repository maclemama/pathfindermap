import {
	GoogleMap,
	MarkerF,
	CircleF,
} from "@react-google-maps/api";
import { useCallback, useMemo, useRef} from "react";
import markerPrimaryIcon from "../../assets/icons/marker-primary.svg";
import Routes from "../Routes/Routes";
import "./Map.scss";

function Map({startingPoint, setStartingPoint, routes }) {
	const mapRef = useRef();

	// const handleCenterChange = ()=>{
	// 	console.log(mapRef.current.center.lat())
	// 	console.log(mapRef.current.center.lng())
	// }

	const mapOptions = useMemo(
		() => ({
			mapId: "f6ca3c1a38d4ecfa",
			disableDefaultUI: false,
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
				// onCenterChanged={handleCenterChange}
			>
				<MarkerF position={startingPoint} icon={markerPrimaryIcon} />

				<Routes routes={routes} startingPoint={startingPoint}/>

				<CircleF
					center={startingPoint}
					radius={1000}
					options={circleOptions}
				/>
			</GoogleMap>
		</section>
	);
}

export default Map;
