import "./RouteSummary.scss";
import RouteSaveButton from "../RouteSaveButton/RouteSaveButton";

function RouteSummary({
	handleRouteSave,
	savedRoute,
	user,
	selectedRouteDetails,
	isHeader,
}) {
	return (
		<div
			className={`route-summary__wrapper ${
				isHeader ? "route-summary__wrapper--header" : ""
			}`}
		>
			<div className="route-summary__left-wrapper">
				{!!user && (
					<RouteSaveButton
						saved={savedRoute}
						onClickHandler={handleRouteSave}
					/>
				)}
				<h2 className="route-summary__title">{`${selectedRouteDetails.route_waypoints.length} place in this path`}</h2>
			</div>
			<div
				className={`route-summary__route-number ${
					isHeader ? "route-summary__route-number--header" : ""
				}`}
			>
				{selectedRouteDetails.walking_distance && (
					<span className="route-summary__route-distance">
						<span className="route-summary__route-unit">Distance: </span>
						{`${selectedRouteDetails.walking_distance} km${
							selectedRouteDetails.walking_distance > 1 ? "s" : ""
						}`}
					</span>
				)}
				{selectedRouteDetails.walking_time && (
					<span className="route-summary__route-distance">
						<span className="route-summary__route-unit">Walking Time: </span>
						{`${selectedRouteDetails.walking_time} min${
							selectedRouteDetails.walking_time > 1 ? "s" : ""
						}`}
					</span>
				)}
			</div>
		</div>
	);
}

export default RouteSummary;
