import PlaceCard from "../PlaceCard/PlaceCard";
import "./RoutePlacesList.scss";
import nextIcon from "../../assets/icons/next.svg";

function RoutePlacesList({ selectedRouteDetails, mapRef }) {
	return (
		<article className="route-place-list">
			{selectedRouteDetails &&
				selectedRouteDetails.route_waypoints &&
				selectedRouteDetails.route_waypoints[0] &&
				selectedRouteDetails.route_waypoints.map((placeData, index) => {
					
					return (
						<div className="route-place-list__wrapper" key={placeData.place_id}>
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
								routeID={selectedRouteDetails.route_id}
							/>
						</div>
					);
				})}
		</article>
	);
}

export default RoutePlacesList;
