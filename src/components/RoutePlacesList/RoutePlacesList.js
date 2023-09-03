import PlaceCard from "../PlaceCard/PlaceCard";
import "./RoutePlacesList.scss";
import nextIcon from "../../assets/icons/next.svg";

function RoutePlacesList({ selectedRouteDetails, mapRef }) {
	// do drag and save button here
	return (
		<article className="route-place-list">
			{selectedRouteDetails &&
				selectedRouteDetails.route_waypoints &&
				selectedRouteDetails.route_waypoints[0] &&
				selectedRouteDetails.route_waypoints.map((placeData, index) => {
					return (
						<div className="route-place-list__wrapper">
                            {index > 0 && (
                                <img
                                    src={nextIcon}
                                    alt="next place in the path"
                                    className="route-place-list__next-icon"
                                />
                            )}
							<PlaceCard
								key={placeData.place_id}
								placeData={placeData}
								mapRef={mapRef}
							/>
						</div>
					);
				})}
		</article>
	);
}

export default RoutePlacesList;
