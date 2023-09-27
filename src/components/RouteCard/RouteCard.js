import "./RouteCard.scss";

import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deleteSavedRoute } from "../../scripts/routeUtils";
import { setModal } from "../../store/modal/modalSlice";

import RouteSaveButton from "../RouteSaveButton/RouteSaveButton";
import RouteCardPathItem from "../RouteCardPathItem/RouteCardPathItem";
import expandIcon from "../../assets/icons/expand.svg";
import collapseIcon from "../../assets/icons/collapse.svg";

function RouteCard({ routeDetails }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [savedRoute, setSavedRoute] = useState(routeDetails.user_saved);
	const [togglePath, setTogglePath] = useState(false);
	const createMapPreviewURL = useCallback(() => {
		if (routeDetails) {
			const markerGenerator = (label, latitude, longitude) => {
				return `&markers=color:green%7Clabel:${label}%7C${latitude},${longitude}`;
			};

			let url = `https://maps.googleapis.com/maps/api/staticmap?size=300x300&maptype=roadmap&map_id=f6ca3c1a38d4ecfa&path=weight:3%7Ccolor:orange%7Cenc:${
				routeDetails.polyline
			}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}${markerGenerator(
				"1",
				routeDetails.latitude,
				routeDetails.longitude
			)}`;

			const waypoints = routeDetails.route_waypoints;

			waypoints.forEach((waypoint) => {
				url += markerGenerator(
					waypoint.waypoints_position + 2,
					waypoint.latitude,
					waypoint.longitude
				);
			});

			return url;
		}
	}, [routeDetails]);

	const mapPreviewURL = createMapPreviewURL();

	const handleRouteSave = async (saveUnsave) => {
		try {
			if (saveUnsave === "unsave") {
				const result = await deleteSavedRoute(routeDetails.route_id);
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
					lat: routeDetails.latitude,
					lng: routeDetails.longitude,
					placeId: routeDetails.place_id,
					address: routeDetails.address,
				},
				passedRouteData: [routeDetails],
			},
		});
	};

	const handleTogglePath = () => {
		setTogglePath((prev) => !prev);
	};

	return (
		savedRoute && (
			<article className="route-card">
				<figure className="route-card__photo-wrapper">
					<img
						src={mapPreviewURL}
						alt={routeDetails.summary}
						className="route-card__map-preview-image"
					/>
				</figure>
				<div className="route-card__content">
					<div className="route-card__top-wrapper">
						<div className="route-card__title-wrapper">
							<h2 className="route-card__title">
								{routeDetails.title ||
									`Path start from ${routeDetails.address}`}
							</h2>
						</div>

						<div className="route-card__top-mid-wrapper">
							<p className="route-card__created-at">
								{new Date(routeDetails.created_at).toLocaleString()}
							</p>
							<RouteSaveButton
								saved={routeDetails.user_saved}
								onClickHandler={handleRouteSave}
							/>
						</div>
					</div>
					<div className="route-card__top-lower-wrapper">
						<div className="route-card__info-wrapper">
							{routeDetails.walking_distance && (
								<div className="route-card__info">
									<p className="route-card__info-text">
										{`${routeDetails.walking_distance} km${
											routeDetails.walking_distance > 1 ? "s" : ""
										}`}
									</p>
								</div>
							)}
							{routeDetails.walking_time && (
								<div className="route-card__info">
									<p className="route-card__info-text">
										{`${routeDetails.walking_time} min${
											routeDetails.walking_time > 1 ? "s" : ""
										}`}
									</p>
								</div>
							)}
						</div>

						<button
							onClick={handleShowMap}
							className="route-card__show-map-button"
						>
							Show Map
						</button>
					</div>
					<div
						className={`route-card__path-list ${
							togglePath ? "" : "route-card__path-list--hidden"
						}`}
					>
						<RouteCardPathItem
							position={1}
							locationName={routeDetails.address}
							label={"Start"}
							key={1}
						/>
						{[...routeDetails.route_waypoints]
							.sort((a, b) => a.waypoints_position - b.waypoints_position)
							.map((location) => (
								<RouteCardPathItem
									position={location.waypoints_position + 2}
									locationName={location.name}
									label={
										location.query_keyword || location.query_mood || "Shuffle"
									}
									key={location.waypoints_position + 2}
								/>
							))}
					</div>
					<button
						className="route-card__toggle-button"
						onClick={handleTogglePath}
					>
						<h4 className="route-card__toggle-button-text">
							Path and Locations
						</h4>
						<img
							src={togglePath ? collapseIcon : expandIcon}
							alt="Toggle path details"
							className="route-card__toggle-button-icon"
						/>
					</button>
				</div>
			</article>
		)
	);
}

export default RouteCard;
