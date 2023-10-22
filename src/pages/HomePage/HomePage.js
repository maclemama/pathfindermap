import "./HomePage.scss";

import { useLoadScript } from "@react-google-maps/api";
import { useLocation } from "react-router";
import { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isMobile } from "react-device-detect";

import {
	getUserLocation,
	getGoogleGeocoder,
} from "../../scripts/locationUtils";
import { setModal } from "../../store/modal/modalSlice";
import { setStartingPoint } from "../../store/startingPoint/startingPointSlice";
import {
	setRoutesDirectionsPlaces,
	resetRoute,
} from "../../store/route/routeSlice";
import { resetLayout } from "../../store/layout/layoutSlice";
import { selectSelectedRoute } from "../../store/route/routeSelector";
import { generateRoutes } from "../../scripts/routeUtils";
import { setAllowedGeolocation } from "../../store/map/mapSlice";

import Map from "../../components/Map/Map";
import ControlMenu from "../../components/ControlMenu/ControlMenu";
import RouteDetailsPanel from "../../components/RouteDetailsPanel/RouteDetailsPanel";
import MapButtonGroup from "../../components/MapButtonGroup/MapButtonGroup";
import SVGIcons from "../../components/SVGIcons/SVGIcons";

function HomePage() {
	const location = useLocation();
	const dispatch = useDispatch();
	const mapRef = useRef();

	const selectedRoute = useSelector(selectSelectedRoute);

	const [libraries] = useState(["places", "marker"]); // remove map library warning by holding it in state
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
		libraries,
		language: "en",
		version: "beta",
	});
	const [mapLoaded, setMapLoaded] = useState(false);

	const setCurrentLocationAsStart = useCallback(
		async (resetCurrent) => {
			try {
				if (location?.state?.passedStartingPoint && !resetCurrent) {
					const routes = generateRoutes(
						location.state.passedRouteData,
						location.state.passedStartingPoint
					);
					dispatch(setRoutesDirectionsPlaces(routes));
					window.history.replaceState(null, "");
				} else {
					const location = await getUserLocation();
					const matchedPlace = await getGoogleGeocoder(location);

					dispatch(
						setStartingPoint({
							lat: location?.location?.lat,
							lng: location?.location?.lng,
							placeId: matchedPlace?.place_id,
							address: matchedPlace?.formatted_address,
						})
					);
					dispatch(setAllowedGeolocation(location.allowedGeolocation));
					dispatch(resetLayout(isMobile));
					dispatch(resetRoute());
				}
			} catch (error) {
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

	const onMapLoaded = (map) => {
		mapRef.current = map;
	};

	const onMapTitesLoaded = () => {
		setMapLoaded(true);
	};

	return (
		<div className="home">
			<div className="home__desktop-right-wrapper">
				{isLoaded && (
					<Map
						mapRef={mapRef}
						onMapLoad={onMapLoaded}
						mapLoaded={mapLoaded}
						onMapTitesLoaded={onMapTitesLoaded}
					/>
				)}
				{!mapLoaded && (
					<div className="home__loading">
						<div className="home__loading-spinner"></div>
						<div className="home__loading-icon-wrapper">
							<SVGIcons iconName={"run"} cssClassName={"home__loading-icon"} />
						</div>
					</div>
				)}
			</div>
			<div className="home__controls-wrapper">
				<div className="home__route-wrapper">
					<div className="home__button-wrapper--desktop">
						<MapButtonGroup mapRef={mapRef} />
					</div>
					{selectedRoute && <RouteDetailsPanel mapRef={mapRef} />}
				</div>
				<ControlMenu
					setCurrentLocationAsStart={setCurrentLocationAsStart}
					isLoaded={isLoaded}
				/>
				<div className="home__button-wrapper--mobile">
					<MapButtonGroup mapRef={mapRef} />
				</div>
			</div>
		</div>
	);
}

export default HomePage;
