import "./HomePage.scss";

import { useLoadScript } from "@react-google-maps/api";
import { useLocation } from "react-router";
import { useState, useEffect, useCallback, createContext } from "react";
import { useDispatch } from "react-redux";

import {
	getUserLocation,
	getGoogleGeocoder,
} from "../../scripts/locationUtils";
import { setModal } from "../../store/modal/modalSlice";
import { setStartingPoint } from "../../store/startingPoint/startingPointSlice";

import Map from "../../components/Map/Map";
import ControlMenu from "../../components/ControlMenu/ControlMenu";
import RouteDetailsPanel from "../../components/RouteDetailsPanel/RouteDetailsPanel";

export const MapRadiusContext = createContext(null);

function HomePage({ mapRef }) {
	const location = useLocation();
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(true);
	const [routes, setRoutes] = useState(null);
	const [selectedRoute, setSelectedRoute] = useState(null);
	const [selectedRouteDirection, setSelectedRouteDirection] = useState(null);
	const [mapRadius, setMapRadius] = useState(3000);

	const [libraries] = useState(["places"]); // remove map library warning by holding it in state
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
		libraries,
		language: "en",
	});

	const setCurrentLocationAsStart = useCallback(
		async (resetCurrent) => {
			try {
				if (
					location.state &&
					location.state.passedStartingPoint &&
					!resetCurrent
				) {
					dispatch(setStartingPoint(location.state.passedStartingPoint));
					setRoutes(location.state.passedRouteData);
				} else {
					const location = await getUserLocation();
					const { latitude, longitude } = location.coords;
					const matchedPlace = await getGoogleGeocoder({
						location: { lat: latitude, lng: longitude },
					});

					dispatch(
						setStartingPoint({
							lat: latitude,
							lng: longitude,
							placeId: matchedPlace.place_id,
							address: matchedPlace.formatted_address,
						})
					);
				}
			} catch (error) {
				dispatch(
					setModal({
						title: "Error",
						message: error.response.data.message || error.message,
					})
				);
			} finally {
				setIsLoading(false);
			}
		},
		[location]
	);

	useEffect(() => {
		setCurrentLocationAsStart();
	}, [setCurrentLocationAsStart]);

	if (loadError) {
		return <div>Error loading map</div>;
	}

	if (isLoading || !isLoaded) {
		return <h1>loading </h1>;
	}

	return (
		<div className="home">
			<MapRadiusContext.Provider value={{ mapRadius, setMapRadius }}>
				<div className="home__desktop-right-wrapper">
					{selectedRoute && (
						<RouteDetailsPanel
							selectedRoute={selectedRoute}
							selectedRouteDirection={selectedRouteDirection}
							routes={routes}
							mapRef={mapRef}
						/>
					)}
					<Map
						routes={routes}
						mapRadius={mapRadius}
						selectedRoute={selectedRoute}
						setSelectedRoute={setSelectedRoute}
						mapRef={mapRef}
						selectedRouteDirection={selectedRouteDirection}
						setSelectedRouteDirection={setSelectedRouteDirection}
					/>
				</div>

				<ControlMenu
					setCurrentLocationAsStart={setCurrentLocationAsStart}
					setRoutes={setRoutes}
				/>
			</MapRadiusContext.Provider>
		</div>
	);
}

export default HomePage;
