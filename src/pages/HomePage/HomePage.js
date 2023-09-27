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
import {
	setRoutes,
	setRoutesDirectionsPlaces,
	resetRoute,
} from "../../store/route/routeSlice";
import { selectSelectedRoute } from "../../store/route/routeSelector";
import { generateRoutes } from "../../scripts/routeUtils";

import Map from "../../components/Map/Map";
import ControlMenu from "../../components/ControlMenu/ControlMenu";
import RouteDetailsPanel from "../../components/RouteDetailsPanel/RouteDetailsPanel";

function HomePage({ mapRef }) {
	const location = useLocation();
	const dispatch = useDispatch();

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
					const routes = generateRoutes(
						location.state.passedRouteData,
						location.state.passedStartingPoint
					);
					dispatch(setRoutesDirectionsPlaces(routes));
				} else {
					dispatch(resetRoute());
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
				console.log(error);
				dispatch(
					setModal({
						title: "Error",
						message: error.response.data.message || error.message,
					})
				);
			}
		},
		[location, dispatch]
	);

	useEffect(() => {
		if (isLoaded) {
			const loadMapAndStartingPoint = async () => {
				await setCurrentLocationAsStart();
			};
			loadMapAndStartingPoint();
		}
	}, [setCurrentLocationAsStart, isLoaded]);

	if (loadError) {
		return <div>Error loading map</div>;
	}

	return (
		<div className="home">
			<div className="home__desktop-right-wrapper">
				{selectedRoute && <RouteDetailsPanel mapRef={mapRef} />}
				{isLoaded && <Map mapRef={mapRef} />}
			</div>

			<ControlMenu setCurrentLocationAsStart={setCurrentLocationAsStart} isLoaded={isLoaded}/>
		</div>
	);
}

export default HomePage;
