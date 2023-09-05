import RoutePlacesList from "../RoutePlacesList/RoutePlacesList";
import SVGIcons from "../SVGIcons/SVGIcons";
import "./RouteDetailsPanel.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { getGoogleGeocoder } from "../../scripts/locationUtilis";
import { useNavigate } from "react-router";

function RouteDetailsPanel({
	selectedRoute,
	routes,
	mapRef,
	signedin,
	isInProfile,
}) {
	const [selectedRouteDetails, setSelectedRouteDetails] = useState(null);
	const [isloading, setIsLoading] = useState(true);
	const [savedRoute, setSavedRoute] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		if (selectedRoute) {
			const routeDetails = routes.filter(
				(route) => route.route_id === selectedRoute
			)[0];
			if (routeDetails) {
				routeDetails.created_at = new Date(
					routeDetails.created_at
				).toLocaleDateString();
				if (isInProfile) {
					getGoogleGeocoder({
						location: {
							lat: routeDetails.latitude,
							lng: routeDetails.longitude,
						},
					}).then((matchedPlace) => {
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
					});
				} else {
					setSelectedRouteDetails(routeDetails);
					setSavedRoute(routeDetails.user_saved);
				}
			}
			setIsLoading(false);
		}
	}, [selectedRoute, routes]);

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
					address: selectedRouteDetails.formatted_address,
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
							{signedin && !savedRoute && (
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

							{signedin && savedRoute && (
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
						{isInProfile && (
							<div className="route-panel__top-right-wrapper">
								<button
									onClick={handleShowMap}
									className="route-panel__show-map-button"
								>
									Show Map
								</button>
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
