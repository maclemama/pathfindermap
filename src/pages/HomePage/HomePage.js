import Map from "../../components/Map/Map";
import ControlMenu from "../../components/ControlMenu/ControlMenu";
import "./HomePage.scss";
import { useLoadScript } from "@react-google-maps/api";
import {
	getUserLocation,
	getGoogleGeocoder,
} from "../../scripts/locationUtils";
import { useState, useEffect, useCallback, createContext } from "react";
import RouteDetailsPanel from "../../components/RouteDetailsPanel/RouteDetailsPanel";
import { useLocation } from "react-router";
import Modal from "../../components/Modal/Modal";

export const StartingPointContext = createContext(null);
export const MapRadiusContext = createContext(null);

function HomePage({ mapRef }) {
	const [startingPoint, setStartingPoint] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [routes, setRoutes] = useState(null);
	const [selectedRoute, setSelectedRoute] = useState(null);
	const [selectedRouteDirection, setSelectedRouteDirection] = useState(null);
	const [mapRadius, setMapRadius] = useState(3000);
	const location = useLocation();
	const [modal, setModal] = useState([]);

	const [libraries] = useState(["places"]); // remove map library warning by holding it in state
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
		libraries,
		language: "en",
	});

	const setCurrentLocationAsStart = useCallback((resetCurrent) => {
		if (location.state && location.state.passedStartingPoint && !resetCurrent) {
			setStartingPoint(location.state.passedStartingPoint);
			setRoutes(location.state.passedRouteData);
			setIsLoading(false);
		} else {
			getUserLocation()
				.then((location) => {
					const { latitude, longitude } = location.coords;
					getGoogleGeocoder({ location: { lat: latitude, lng: longitude } })
						.then((matchedPlace) => {
							setStartingPoint({
								lat: latitude,
								lng: longitude,
								placeId: matchedPlace.place_id,
								address: matchedPlace.formatted_address,
							});
						})
						.catch((error) => {
							setModal([
								<Modal
									title={"Error"}
									message={error.message}
									setModal={setModal}
								/>,
							]);
						});
				})
				.catch((error) => {
					setModal([
						<Modal
							title={"Error"}
							message={error.message}
							setModal={setModal}
						/>,
					]);
				});
			setIsLoading(false);
		}
	}, [location]);

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
			<StartingPointContext.Provider
				value={{ startingPoint, setStartingPoint }}
			>
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
							startingPoint={startingPoint}
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
						setModal={setModal}
					/>
				</MapRadiusContext.Provider>
			</StartingPointContext.Provider>
			{modal[0]}
		</div>
	);
}

export default HomePage;
