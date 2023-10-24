import "./Map.scss";

import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { Fragment, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { selectStartingPoint } from "../../store/startingPoint/startingPointSelector";

import RouteSelector from "../RouteSelector/RouteSelector";
import markerPrimaryIcon from "../../assets/icons/marker-primary.svg";
import Routes from "../Routes/Routes";
import MapMarkerCurrent from "../MapMarkerCurrent/MapMarkerCurrent";
import MapRadius from "../MapRadius/MapRadius";

function Map({ mapRef, mapLoaded, onMapTitesLoaded }) {
	const startingPoint = useSelector(selectStartingPoint);
	const [mapModal, setMapModal] = useState([]);

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

	const onMapLoaded = (map) => {
		mapRef.current = map;
	};

	return (
		<section className="map">
			<GoogleMap
				mapContainerClassName="map__container"
				center={startingPoint}
				onLoad={(map) => onMapLoaded(map)}
				options={mapOptions}
				onTilesLoaded={onMapTitesLoaded}
			>
				<MarkerF position={startingPoint} icon={markerPrimaryIcon} />

				{mapLoaded && (
					<MapMarkerCurrent
						map={mapRef.current}
						setMapModal={setMapModal}
						mapModal={mapModal}
					/>
				)}

				<Routes mapRef={mapRef} />

				<MapRadius startingPoint={startingPoint} />
			</GoogleMap>
			<RouteSelector />
			{mapModal?.[0] &&
				mapModal.map((modal, index) => (
					<Fragment key={index}>{modal}</Fragment>
				))}
		</section>
	);
}

export default Map;
