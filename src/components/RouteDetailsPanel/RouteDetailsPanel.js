import RoutePlacesList from "../RoutePlacesList/RoutePlacesList";
import SVGIcons from "../SVGIcons/SVGIcons";
import "./RouteDetailsPanel.scss";
import { useEffect, useState } from "react";
import axios from "axios";

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

	useEffect(() => {
		if (selectedRoute) {
			const routeDetails = routes.filter(
				(route) => route.route_id === selectedRoute
			);
			if (routeDetails[0]) {
				setSelectedRouteDetails(routeDetails[0]);
				setSavedRoute(routeDetails[0].user_saved);
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
					if (res.data.success) {
						setSavedRoute(!savedRoute);
					}
				});
		}
	};

	if (isloading) {
		return;
	}

	return (
		<section className="route-panel">
			{selectedRouteDetails && (
				<>
					<div className="route-panel__top-wrapper">
						<h2 className="route-panel__title">Places in the Path</h2>
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
