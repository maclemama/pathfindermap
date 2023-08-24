import {
	GoogleMap,
	Marker,
	useLoadScript,
	DirectionsRenderer,
} from "@react-google-maps/api";
import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import markerIcon from "../../assets/icons/marker-primary.svg";
import getUserLocation from "../../scripts/locationUtilis";
import "./Map.scss"

function Map() {
	const mapRef = useRef();
	const libraries = ["places"];

	const [currentLocation, SetCurrentLocation] = useState();
	const [isLoading, setIsLoading] = useState(true);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
        libraries,
    });

	useEffect(() => {
		// get user current location
		getUserLocation()
			.then((location) => {
				const { latitude, longitude } = location.coords;
				SetCurrentLocation({ lat: latitude, lng: longitude });
				setIsLoading(false);
                console.log(loadError)
			})
			.catch((err) => console.log(err));
	}, []);

	const mapOptions = useMemo(
		() => ({
			mapId: "f6ca3c1a38d4ecfa",
			disableDefaultUI: true,
			clickableIcons: false,
		}),
		[]
	);

	const onLoad = useCallback((map) => (mapRef.current = map), []);

	// const [directions, setDirections] = useState();

	// const fetchDirections = (place) => {
	// 	const service = new window.google.maps.DirectionsService();
	// 	service.route(
	// 		{
	// 			origin: place,
	// 			destination: markerPositions[0],
	// 			travelMode: "WALKING",
	// 		},
	// 		(result, status) => {
	// 			if (status === "OK" && result) {
	// 				console.log(result);
	// 				setDirections(result);
	// 			}
	// 		}
	// 	);
	// };

	if (loadError) {
		return <div>Error loading map</div>;
	}

	if (isLoading && !isLoaded) {
		return <h1>loading </h1>;
	}

	return (
		<>
			<GoogleMap
				mapContainerClassName="map__container"
				center={currentLocation}
				zoom={17}
				onLoad={onLoad}
				options={mapOptions}
			>
				<Marker
					position={currentLocation}
					// onClick={() => fetchDirections(position)}
					icon={markerIcon}
				/>

				{/* {directions && (
					<DirectionsRenderer
						directions={directions}
						options={{
							polylineOptions: {
								zIndex: 50,
								strokeColor: "#1976D2",
								strokeWeight: 5,
							},
						}}
					/>
				)} */}
			</GoogleMap>
		</>
	);
}

export default Map;
