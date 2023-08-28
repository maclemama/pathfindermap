import Map from "../../components/Map/Map";
import ControlMenu from "../../components/ControlMenu/ControlMenu";
import "./HomePage.scss";
import { useLoadScript } from "@react-google-maps/api";
import {
	getUserLocation,
	getGoogleGeocoder,
} from "../../scripts/locationUtilis";
import { useState, useEffect, useCallback } from "react";

function HomePage() {
	const [startingPoint, setStartingPoint] = useState(null);
	const [isCurrentLocation, setIsCurrentLoaction] = useState(true);
	const [isLoading, setIsLoading] = useState(true);

	const libraries = ["places"];
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
		libraries,
	});

	const setCurrentLocationAsStart = useCallback(()=>{
		// get user current location
		getUserLocation()
			.then((location) => {
				const { latitude, longitude } = location.coords;
				// setStartingPoint({ lat: latitude, lng: longitude });
				getGoogleGeocoder({ location: { lat: latitude, lng: longitude } })
					.then((matchedPlace) => {
						setStartingPoint({
							lat: latitude,
							lng: longitude,
							placeId: matchedPlace.place_id,
							address: matchedPlace.formatted_address,
						});
						setIsCurrentLoaction(true)
						setIsLoading(false);
					})
					.catch((e) => console.log("Geocoder failed due to: " + e));
			})
			.catch((err) => console.log(err));
	})

	useEffect(() => {
		setCurrentLocationAsStart();
	}, []);

	if (loadError) {
		return <div>Error loading map</div>;
	}

	if (isLoading || !isLoaded) {
		return <h1>loading </h1>;
	}

	return (
		<div className="home">
			<Map startingPoint={startingPoint} setStartingPoint={setStartingPoint} />
			<ControlMenu
				startingPoint={startingPoint}
				setStartingPoint={setStartingPoint}
				isCurrentLocation={isCurrentLocation}
				setIsCurrentLoaction={setIsCurrentLoaction}
				setCurrentLocationAsStart={setCurrentLocationAsStart}
			/>
		</div>
	);
}

export default HomePage;
