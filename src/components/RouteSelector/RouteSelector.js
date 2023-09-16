import "./RouteSelector.scss";
import { useEffect } from "react";

function RouteSelector({
	routes,
	selectedRoute,
	setSelectedRoute,
	directions,
	setSelectedRouteDirection,
	mapRef,
}) {
	useEffect(() => {
		console.log(selectedRoute);
	}, [selectedRoute]);
	const handleRouteSwitch = (direction) => {
		setSelectedRouteDirection(direction);
		setSelectedRoute(direction.route_id);
	};

	const handleShowAll = () => {
		setSelectedRouteDirection(null);
		setSelectedRoute(null);
	};
	return (
		routes && (
			<section className="route-selector">
				<h2 className="route-selector__title">Path</h2>
				{directions.map((direction, index) => {
					const thisDirection = index + 1;
					const thisRouteID = direction.route_id;
					return (
						<button
							className={`route-selector__button ${
								selectedRoute === thisRouteID
									? "route-selector__button--active"
									: ""
							}`}
							onClick={() => handleRouteSwitch(direction)}
							key={thisDirection}
						>
							<h4
								className={`route-selector__path-text ${
									selectedRoute === thisRouteID
										? "route-selector__path-text--active"
										: ""
								}`}
							>
								{thisDirection}
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
					<h2 className="route-selector__show-all-title">Show All</h2>
				</button>
			</section>
		)
	);
}

export default RouteSelector;
