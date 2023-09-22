import "./HomePage.scss";

import { useLoadScript } from "@react-google-maps/api";
import { useLocation } from "react-router";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
	getUserLocation,
	getGoogleGeocoder,
} from "../../scripts/locationUtils";
import { setModal } from "../../store/modal/modalSlice";
import { setStartingPoint } from "../../store/startingPoint/startingPointSlice";
import { setRoutes } from "../../store/route/routeSlice";
import { selectSelectedRoute } from "../../store/route/routeSelector";

import Map from "../../components/Map/Map";
import ControlMenu from "../../components/ControlMenu/ControlMenu";
import RouteDetailsPanel from "../../components/RouteDetailsPanel/RouteDetailsPanel";

function HomePage({ mapRef }) {
	const location = useLocation();
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(true);
	const selectedRoute = useSelector(selectSelectedRoute);

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
					dispatch(setRoutes(location.state.passedRouteData));
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
		[location, dispatch]
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
			<div className="home__desktop-right-wrapper">
				{selectedRoute && <RouteDetailsPanel mapRef={mapRef} />}
				<Map mapRef={mapRef} />
			</div>

			<ControlMenu setCurrentLocationAsStart={setCurrentLocationAsStart} />
		</div>
	);
}

export default HomePage;
