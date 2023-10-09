import "./RouteDetailsPanel.scss";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

import { selectCurrentUser } from "../../store/user/userSelector";
import {
	selectSelectedRoute,
	selectSelectedDirection,
	selectRoutes,
} from "../../store/route/routeSelector";
import { selectStartingPoint } from "../../store/startingPoint/startingPointSelector";
import {
	selectShowRouteDetailsPanel,
	selectShowRouteControlMenu,
} from "../../store/layout/layoutSelector";
import {
	setShowRouteDetailsPanel,
	setShowRouteControlMenu,
} from "../../store/layout/layoutSlice";
import { setModal } from "../../store/modal/modalSlice";
import { postSaveRoute, deleteSavedRoute } from "../../scripts/routeUtils";

import SVGIcons from "../SVGIcons/SVGIcons";
import RoutePlacesList from "../RoutePlacesList/RoutePlacesList";
import RouteSummary from "../RouteSummary/RouteSummary";

function RouteDetailsPanel({ mapRef, routeDetails }) {
	const dispatch = useDispatch();
	const user = useSelector(selectCurrentUser);
	const routes = useSelector(selectRoutes);
	const selectedRoute = useSelector(selectSelectedRoute);
	const selectedDirection = useSelector(selectSelectedDirection);
	const startingPoint = useSelector(selectStartingPoint);
	const routeDetailsPanelExpanded = useSelector(selectShowRouteDetailsPanel);
	const controlMenuPanelExpanded = useSelector(selectShowRouteControlMenu);
	const [selectedRouteDetails, setSelectedRouteDetails] = useState(null);
	const [isloading, setIsLoading] = useState(true);
	const [savedRoute, setSavedRoute] = useState(null);

	useEffect(() => {
		if (selectedRoute && selectedDirection) {
			routeDetails = routes.filter(
				(route) => route.route_id === selectedRoute
			)?.[0];
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
			setIsLoading(false);
		}
	}, [selectedRoute, selectedDirection, routes, dispatch]);

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

	const toggleShowHide = () => {
		dispatch(setShowRouteDetailsPanel(!routeDetailsPanelExpanded));
		if (!routeDetailsPanelExpanded) {
			dispatch(setShowRouteControlMenu(false));
		}
	};

	if (isloading) {
		return;
	}

	return (
		selectedRouteDetails && (
			<section
				className={`route-panel ${
					controlMenuPanelExpanded ? "route-panel--hidden" : ""
				}`}
			>
				<div className="route-panel__toggle-wrapper" onClick={toggleShowHide}>
					<motion.button
						whileHover={{
							scale: 1.1,
							transition: { duration: 0.3 },
						}}
						whileTap={{ scale: 0.8 }}
						className="route-panel__toggle-button"
					>
						<div
							className={`route-panel__toggle ${
								!routeDetailsPanelExpanded ? "" : "route-panel__toggle--active"
							} `}
						>
							<SVGIcons iconName="collapse" cssClassName="route-panel__icon" />
						</div>
						<div
							className={`route-panel__toggle ${
								routeDetailsPanelExpanded ? "" : "route-panel__toggle--active"
							} `}
						>
							<SVGIcons iconName="expand" cssClassName="route-panel__icon" />
							<h4>Expand Path details</h4>
						</div>
					</motion.button>
					{routeDetailsPanelExpanded || (
						<RouteSummary
							user={user}
							handleRouteSave={handleRouteSave}
							selectedRouteDetails={selectedRouteDetails}
							savedRoute={savedRoute}
							isHeader={true}
						/>
					)}
				</div>

				<AnimatePresence>
					{routeDetailsPanelExpanded && (
						<motion.div
							initial={{ y: -100, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							exit={{ y: 100, opacity: 0 }}
							className="route-panel__content-wrapper"
						>
							<div className="route-panel__wrapper">
								<RouteSummary
									user={user}
									handleRouteSave={handleRouteSave}
									selectedRouteDetails={selectedRouteDetails}
									savedRoute={savedRoute}
								/>
								<RoutePlacesList
									selectedRouteDetails={selectedRouteDetails}
									mapRef={mapRef}
								/>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</section>
		)
	);
}

export default RouteDetailsPanel;
