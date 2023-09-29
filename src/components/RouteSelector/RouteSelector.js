import "./RouteSelector.scss";

import { useSelector, useDispatch } from "react-redux";

import { selectRoutes } from "../../store/route/routeSelector";
import { selectSelectedRoute } from "../../store/route/routeSelector";
import { setSelectedRoute } from "../../store/route/routeSlice";

function RouteSelector() {
	const dispatch = useDispatch();
	const routes = useSelector(selectRoutes);
	const selectedRoute = useSelector(selectSelectedRoute);
	const handleRouteSwitch = (route_id) => {
		dispatch(setSelectedRoute(route_id));
	};

	const handleShowAll = () => {
		dispatch(setSelectedRoute(null));
	};

	return (
		routes && (
			<section className="route-selector">
				<h4 className="route-selector__title">Path</h4>
				{routes.map((route, index) => {
					const thisRouteIndex = index + 1;
					const thisRouteID = route.route_id;
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
							<h4
								className={`route-selector__path-text ${
									selectedRoute === thisRouteID
										? "route-selector__path-text--active"
										: ""
								}`}
							>
								{thisRouteIndex}
							</h4>
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
