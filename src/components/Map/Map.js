import {
	GoogleMap,
	MarkerF,
	DirectionsRenderer,
	CircleF,
	InfoWindowF,
} from "@react-google-maps/api";
import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import markerPrimaryIcon from "../../assets/icons/marker-primary.svg";
import markerSecondaryIcon from "../../assets/icons/marker-secondary.svg";
import "./Map.scss";
import axios from "axios";

function Map({startingPoint, setStartingPoint }) {
	const mapRef = useRef();
	const [places, setPlaces] = useState();

	// useEffect(() => {
	// 	axios
	// 		.post(`${process.env.REACT_APP_SERVER_URL}/query`, {
	// 			// input with token header for logged in users
	// 			query_mode: "mood", // either mood, random, objective
	// 			query_mood: "Relax",
	// 			query_purpose: ["shopping", "lunch", "park visit"],
	// 			duration: "01:00:00",
	// 			radius: 1500,
	// 			longitude: longitude,
	// 			latitude: latitude,
	// 		})
	// 		.then((res) => {
	// 			console.log(res.data);
	// 			setPlaces(res.data);
	// 		});
	// }, []);

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

	const [directions, setDirections] = useState();
	const [waypoints, setWaypoints] = useState([]);

	const fetchDirections = (origin, destination) => {
		console.log(destination);
		/* eslint-disable */
		setWaypoints([
			...waypoints,
			{ location: new google.maps.LatLng(destination.lat, destination.lng) },
		]);
		const service = new google.maps.DirectionsService();
		/* eslint-enable */
		service.route(
			{
				origin: origin,
				destination: destination,
				travelMode: "WALKING",
				waypoints: waypoints,
				optimizeWaypoints: true,
			},
			(result, status) => {
				if (status === "OK" && result) {
					console.log(result);
					setDirections(result);
				}
			}
		);
	};


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

				{places &&
					places.map((place) => (
						<MarkerF
							position={place.geometry.location}
							onClick={() =>
								fetchDirections(startingPoint, place.geometry.location)
							}
							icon={markerSecondaryIcon}
						>
							<InfoWindowF position={place.geometry.location}>
								<div>{place.name}</div>
							</InfoWindowF>
						</MarkerF>
					))}

				{directions && (
					<DirectionsRenderer
						directions={directions}
						options={{
							polylineOptions: {
								zIndex: 50,
								strokeColor: "#1976D2",
								strokeWeight: 5,
							},
							markerOptions: {
								visible: false,
							},
						}}
					/>
				)}

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
