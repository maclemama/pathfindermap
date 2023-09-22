import "./RouteDetailsPanel.scss";

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { selectCurrentUser } from "../../store/user/userSelector";
import { selectSelectedRoute } from "../../store/route/routeSelector";
import { selectSelectedDirection } from "../../store/route/routeSelector";
import { selectRoutes } from "../../store/route/routeSelector";
import { getGoogleGeocoder } from "../../scripts/locationUtils";
import { setModal } from "../../store/modal/modalSlice";

import RoutePlacesList from "../RoutePlacesList/RoutePlacesList";
import SVGIcons from "../SVGIcons/SVGIcons";

function RouteDetailsPanel({ mapRef, isInProfile }) {
	const dispatch = useDispatch();
	const user = useSelector(selectCurrentUser);
	const routes = useSelector(selectRoutes);
	const selectedRoute = useSelector(selectSelectedRoute);
	const selectedDirection = useSelector(selectSelectedDirection);
	const [selectedRouteDetails, setSelectedRouteDetails] = useState(null);
	const [isloading, setIsLoading] = useState(true);
	const [savedRoute, setSavedRoute] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		if (selectedRoute && selectedDirection) {
			const routeDetails = routes.filter(
				(route) => route.route_id === selectedRoute
			)[0];

			if (isInProfile) {
				getGoogleGeocoder({
					location: {
						lat: routeDetails.latitude,
						lng: routeDetails.longitude,
					},
				})
					.then((matchedPlace) => {
						let postal_town, country, route;
						matchedPlace.address_components.forEach((addr) => {
							if (addr.types.includes("postal_town")) {
								postal_town = addr.long_name;
							}
							if (addr.types.includes("country")) {
								country = addr.long_name;
							}
							if (addr.types.includes("route")) {
								route = addr.short_name;
							}
						});
						routeDetails.starting_address =
							`${route ? route + ", " : ""}` +
							`${postal_town ? postal_town + ", " : ""}` +
							country;
						routeDetails.place_id = matchedPlace.place_id;
						setSelectedRouteDetails(routeDetails);
						setSavedRoute(routeDetails.user_saved);
					})
					.catch((error) => {
						dispatch(
							setModal({
								title: "Error",
								message: error.message,
							})
						);
						setSelectedRouteDetails([]);
					});
			} else {
				const {walking_distance, walking_time} = selectedDirection;

				setSelectedRouteDetails({
					...routeDetails,
					walking_distance,
					walking_time
				});
				setSavedRoute(routeDetails.user_saved);
			}

			setIsLoading(false);
		}
	}, [selectedRoute, selectedDirection, routes, isInProfile, dispatch]);

	const handleRouteSave = (saveUnsave) => {
		const token = localStorage.getItem("token");
		const apiPath = `${process.env.REACT_APP_SERVER_URL}/route/${selectedRouteDetails.route_id}/${saveUnsave}`;

		if (token) {
			axios
				.patch(
					apiPath,
					{},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)
				.then((res) => {
					if (res.data) {
						setSavedRoute(res.data.user_saved);
					}
				});
		}
	};

	const handleShowMap = () => {
		navigate("/", {
			state: {
				passedStartingPoint: {
					lat: selectedRouteDetails.latitude,
					lng: selectedRouteDetails.longitude,
					placeId: selectedRouteDetails.place_id,
					address: selectedRouteDetails.starting_address,
				},
				passedRouteData: [selectedRouteDetails],
			},
		});
	};

	if (isloading) {
		return;
	}

	return (
		<section className="route-panel">
			{selectedRouteDetails && (
				<>
					<div className="route-panel__top-wrapper">
						<div className="route-panel__top-left-wrapper">
							{!!user && !savedRoute && (
								<button
									className="route-panel__save-button"
									onClick={() => handleRouteSave("save")}
								>
									<SVGIcons
										iconName={"heart_empty"}
										cssClassName={"route-panel__save-icon"}
									/>
								</button>
							)}

							{!!user && savedRoute && (
								<button
									className="route-panel__save-button"
									onClick={() => handleRouteSave("unsave")}
								>
									<SVGIcons
										iconName={"heart_fill"}
										cssClassName={"route-panel__save-icon"}
									/>
								</button>
							)}

							{isInProfile ? (
								<h2 className="route-panel__title">
									Path start from {selectedRouteDetails.starting_address}. Saved
									at {selectedRouteDetails.created_at}
								</h2>
							) : (
								<h2 className="route-panel__title">Places in the Path</h2>
							)}
						</div>
						{isInProfile ? (
							<div className="route-panel__top-right-wrapper">
								<button
									onClick={handleShowMap}
									className="route-panel__show-map-button"
								>
									Show Map
								</button>
							</div>
						) : (
							<div className="route-panel__route-number">
								{selectedRouteDetails.walking_distance && (
									<span className="route-panel__route-distance">{`Distance: ${
										selectedRouteDetails.walking_distance
									} km${
										selectedRouteDetails.walking_distance > 1 ? "s" : ""
									}`}</span>
								)}
								{selectedRouteDetails.walking_time && (
									<span className="route-panel__route-distance">{`Walking Duration: ${
										selectedRouteDetails.walking_time
									} min${
										selectedRouteDetails.walking_time > 1 ? "s" : ""
									}`}</span>
								)}
							</div>
						)}
					</div>
					<RoutePlacesList
						selectedRouteDetails={selectedRouteDetails}
						mapRef={mapRef}
					/>
				</>
			)}
		</section>
	);
}

export default RouteDetailsPanel;
