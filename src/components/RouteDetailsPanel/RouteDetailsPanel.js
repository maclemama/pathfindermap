import "./RouteDetailsPanel.scss";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { selectCurrentUser } from "../../store/user/userSelector";
import { selectSelectedRoute } from "../../store/route/routeSelector";
import { selectSelectedDirection } from "../../store/route/routeSelector";
import { selectRoutes } from "../../store/route/routeSelector";
import { selectStartingPoint } from "../../store/startingPoint/startingPointSelector";
import { setModal } from "../../store/modal/modalSlice";
import { postSaveRoute, deleteSavedRoute } from "../../scripts/routeUtils";

import RoutePlacesList from "../RoutePlacesList/RoutePlacesList";
import RouteSaveButton from "../RouteSaveButton/RouteSaveButton";

function RouteDetailsPanel({ mapRef, isInProfile, routeDetails }) {
	const dispatch = useDispatch();
	const user = useSelector(selectCurrentUser);
	const routes = useSelector(selectRoutes);
	const selectedRoute = useSelector(selectSelectedRoute);
	const selectedDirection = useSelector(selectSelectedDirection);
	const startingPoint = useSelector(selectStartingPoint);
	const [selectedRouteDetails, setSelectedRouteDetails] = useState(null);
	const [isloading, setIsLoading] = useState(true);
	const [savedRoute, setSavedRoute] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		if (selectedRoute && selectedDirection) {
			if (isInProfile) {
				// getGoogleGeocoder({
				// 	location: {
				// 		lat: routeDetails.latitude,
				// 		lng: routeDetails.longitude,
				// 	},
				// })
				// 	.then((matchedPlace) => {
				// 		let postal_town, country, route;
				// 		matchedPlace.address_components.forEach((addr) => {
				// 			if (addr.types.includes("postal_town")) {
				// 				postal_town = addr.long_name;
				// 			}
				// 			if (addr.types.includes("country")) {
				// 				country = addr.long_name;
				// 			}
				// 			if (addr.types.includes("route")) {
				// 				route = addr.short_name;
				// 			}
				// 		});
				// 		routeDetails.starting_address =
				// 			`${route ? route + ", " : ""}` +
				// 			`${postal_town ? postal_town + ", " : ""}` +
				// 			country;
				// 		routeDetails.place_id = matchedPlace.place_id;
				// 		setSelectedRouteDetails(routeDetails);
				// 		setSavedRoute(routeDetails.user_saved);
				// 	})
				// 	.catch((error) => {
				// 		dispatch(
				// 			setModal({
				// 				title: "Error",
				// 				message: error.message,
				// 			})
				// 		);
				// 		setSelectedRouteDetails([]);
				// 	});

				setSelectedRouteDetails(routeDetails);
			} else {
				routeDetails = routes.filter(
					(route) => route.route_id === selectedRoute
				)[0];

				const { walking_distance, walking_time, polyline, summary } =
					selectedDirection;

				setSelectedRouteDetails({
					...routeDetails,
					walking_distance,
					walking_time,
					polyline,
					summary,
				});
				setSavedRoute(routeDetails.user_saved);
			}

			setIsLoading(false);
		}
	}, [selectedRoute, selectedDirection, routes, isInProfile, dispatch]);

	const handleRouteSave = async (saveUnsave) => {
		try {
			if (saveUnsave === "save") {
				const result = await postSaveRoute({
					...selectedRouteDetails,
					...startingPoint,
				});
				if (result && result[0]) {
					setSavedRoute(result[0].user_saved);
				} else {
					throw Error("Could not perform this action at the moment.");
				}
			}

			if (saveUnsave === "unsave") {
				const result = await deleteSavedRoute(selectedRouteDetails.route_id);
				if (result.success) {
					setSavedRoute(false);
				} else {
					throw Error("Could not perform this action at the moment.");
				}
			}
		} catch (error) {
			dispatch(
				setModal({
					title: "Error",
					message: error.message,
				})
			);
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
							{!!user && (
								<RouteSaveButton
									saved={savedRoute}
									onClickHandler={handleRouteSave}
								/>
							)}

							{isInProfile ? (
								<h2 className="route-panel__title">
									Path start from {selectedRouteDetails.address}. Saved at{" "}
									{selectedRouteDetails.created_at}
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
