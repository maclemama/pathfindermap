import "./RouteSelector.scss";

import { useSelector, useDispatch } from "react-redux";

import {
	selectRoutes,
	selectSelectedRoute,
	selectWalkingInfo,
} from "../../store/route/routeSelector";
import { setSelectedRoute } from "../../store/route/routeSlice";
import { selectShowRouteControlMenu } from "../../store/layout/layoutSelector";
import { setShowRouteControlMenu } from "../../store/layout/layoutSlice";
import { selectWalkingMode } from "../../store/map/mapSelector";

import SVGIcons from "../SVGIcons/SVGIcons";

function RouteSelector() {
	const dispatch = useDispatch();
	const routes = useSelector(selectRoutes);
	const selectedRoute = useSelector(selectSelectedRoute);
	const walkingInfo = useSelector(selectWalkingInfo);
	const walkingMode = useSelector(selectWalkingMode);
	const controlMenuExpanded = useSelector(selectShowRouteControlMenu);
	const handleRouteSwitch = (route_id) => {
		dispatch(setSelectedRoute(route_id));
		if (controlMenuExpanded) {
			dispatch(setShowRouteControlMenu(false));
		}
	};

	const handleShowAll = () => {
		dispatch(setSelectedRoute(null));
	};

	return (
		routes &&
		routes.length > 1 &&
		!walkingMode &&
		walkingInfo && (
			<section
				className={`route-selector ${
					controlMenuExpanded ? "route-selector--with-menu" : ""
				}`}
			>
				<div className="route-selector__left-wrapper">
					<h4 className="route-selector__title">Path</h4>
					<div className="route-selector__icon-wrapper">
						<SVGIcons iconName={"walk"} cssClassName={"route-selector__icon"} />
					</div>
				</div>

				{routes.map((route, index) => {
					const thisRouteIndex = index + 1;
					const thisRouteID = route.route_id;
					const walkingTime = walkingInfo.filter(
						(r) => r.route_id === thisRouteID
					)?.[0]?.walking_time;
					return (
						<button
							className={`route-selector__button ${
								selectedRoute === thisRouteID
									? "route-selector__button--active"
									: ""
							}`}
							onClick={() => handleRouteSwitch(thisRouteID)}
							key={thisRouteIndex}
						>
							<div className="route-selector__button-wrapper">
								<div className="route-selector__path-text-wrapper">
									<h4
										className={`route-selector__path-text ${
											selectedRoute === thisRouteID
												? "route-selector__path-text--active"
												: ""
										}`}
									>
										{thisRouteIndex}
									</h4>
								</div>
								<p className="route-selector__path-walking-info">{`${walkingTime}m`}</p>
							</div>
						</button>
					);
				})}
				<button
					className={`route-selector__show-all-button ${
						selectedRoute === null
							? "route-selector__show-all-button--active"
							: ""
					}`}
					onClick={handleShowAll}
				>
					<h4 className="route-selector__show-all-title">Show All</h4>
				</button>
			</section>
		)
	);
}

export default RouteSelector;
