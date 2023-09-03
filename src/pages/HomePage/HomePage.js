import Map from "../../components/Map/Map";
import ControlMenu from "../../components/ControlMenu/ControlMenu";
import "./HomePage.scss";
import { useLoadScript } from "@react-google-maps/api";
import {
	getUserLocation,
	getGoogleGeocoder,
} from "../../scripts/locationUtilis";
import { useState, useEffect, useCallback, useRef } from "react";
import useMediaQuery from "../../scripts/useMediaQuery";
import RouteDetailsPanel from "../../components/RouteDetailsPanel/RouteDetailsPanel";

function HomePage() {
	const mapRef = useRef();
	const [startingPoint, setStartingPoint] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [routes, setRoutes] = useState(null);
	const [selectedRoute, setSelectedRoute] = useState(null);
	const [mapRadius, setMapRadius] = useState(3000);
	const isDesktop = useMediaQuery("(min-width: 1280px)");

	const [libraries] = useState(["places"]); // remove map library warning by holding it in state
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
		libraries,
	});

	const setCurrentLocationAsStart = useCallback(() => {
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
						setIsLoading(false);
					})
					.catch((e) => console.log("Geocoder failed due to: " + e));
			})
			.catch((err) => console.log(err));
	}, []);

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
			<div className="home__desktop-right-wrapper">
				{selectedRoute && (
					<RouteDetailsPanel
						selectedRoute={selectedRoute}
						routes={routes}
						mapRef={mapRef}
					/>
				)}
				<Map
					startingPoint={startingPoint}
					setStartingPoint={setStartingPoint}
					routes={routes}
					mapRadius={mapRadius}
					setSelectedRoute={setSelectedRoute}
					mapRef={mapRef}
				/>
			</div>
			<ControlMenu
				startingPoint={startingPoint}
				setStartingPoint={setStartingPoint}
				setCurrentLocationAsStart={setCurrentLocationAsStart}
				setRoutes={setRoutes}
				setMapRadius={setMapRadius}
				isDesktop={isDesktop}
			/>
		</div>
	);
}

export default HomePage;
