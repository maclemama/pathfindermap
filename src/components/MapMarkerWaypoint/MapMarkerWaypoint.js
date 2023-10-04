import "./MapMarkerWaypoint.scss";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import {
	getPlaceSessionData,
	setPlaceSessionData,
} from "../../scripts/sessionStorage";
import {
	selectSelectedPlaces,
	selectHighlightedPlace,
} from "../../store/route/routeSelector";
import { setHighlightedPlace } from "../../store/route/routeSlice";

import MapMarker from "../MapMarker/MapMarker";
import markerIcon from "../../assets/icons/marker-secondary.svg";
import { PriceInfo, RatingInfo } from "../PlaceInfo/PlaceInfo";

function MapMarkerWaypoint({ position, map, placeData }) {
	const dispatch = useDispatch();
	const [markerFlipped, setMarkerFlipped] = useState(false);
	const selectedPlaces = useSelector(selectSelectedPlaces);
	const highlighedPlace = useSelector(selectHighlightedPlace);
	const [placeGoogleData, setPlaceGoogleData] = useState(null);

	const routePlaceID = placeData.route_id + placeData.place_id;
	const markerVisibility = selectedPlaces.includes(routePlaceID);
	const isHighlighted = highlighedPlace === routePlaceID;

	const handleMarkerClick = () => {
		setMarkerFlipped((prev) => !prev);
		dispatch(
			setHighlightedPlace(routePlaceID === highlighedPlace ? "" : routePlaceID)
		);
	};

	useEffect(() => {
		const storedPlace = getPlaceSessionData(placeData.place_id);
		const hasData = storedPlace ? storedPlace : false;
		console.log(`marker hasData ? ${hasData}`);
		if (!hasData) {
			const service = new window.google.maps.places.PlacesService(map);
			service.getDetails(
				{
					placeId: placeData.place_id,
				},
				(data, status) => {
					if (status === window.google.maps.places.PlacesServiceStatus.OK) {
						let result = {
							open_now:
								data.current_opening_hours &&
								data.current_opening_hours.open_now,
							current_opening_hours:
								data.current_opening_hours &&
								data.current_opening_hours.periods &&
								data.current_opening_hours.periods[0],
							formatted_address: data.formatted_address,
							formatted_phone_number: data.formatted_phone_number,
							icon: data.icon,
							name: data.name,
							price_level: data.price_level,
							rating: data.rating,
							google_map_url: data.url,
							website: data.website,
						};

						const photo =
							data.photos &&
							data.photos[0] &&
							data.photos[0].getUrl({ maxWidth: 500, maxHeight: 500 });
						if (photo) {
							result.photo = photo;
						}

						setPlaceSessionData(placeData.place_id, JSON.stringify(result));
						setPlaceGoogleData(result);
					}
				}
			);
		} else {
			setPlaceGoogleData(JSON.parse(hasData));
		}
	}, []);

	const markerVariants = {
		hover: {
			scale: 1.1,
			transition: {
				duration: 0.3,
			},
		},
		bounce: {
			y: [0, 5, 10, 5, 0],
			transition: {
				type: "easeInOut",
				duration: 0.8,
				repeat: 1,
			},
		},
		initial: {
			rotateY: 0,
		},
	};

	return (
		position &&
		markerVisibility && (
			<MapMarker
				position={position}
				map={map}
				onClickFuc={() => handleMarkerClick()}
				depandState={{ markerFlipped, isHighlighted }}
			>
				<motion.div
					animate={{ rotateY: markerFlipped ? 180 : 0 }}
					transition={{ duration: 0.8 }}
					initial={{ rotateY: 0 }}
					className="marker-waypoint"
				>
					<motion.div
						variants={markerVariants}
						initial="initial"
						animate={isHighlighted ? "bounce" : ""}
						whileHover="hover"
						whileFocus="hover"
						whileTap="hover"
						className="marker-waypoint"
					>
						{placeGoogleData && (
							<motion.div
								className={`marker-waypoint__info-card ${
									isHighlighted ? "marker-waypoint__info-card--highlighted" : ""
								}`}
								style={{ visibility: markerFlipped ? "visible" : "hidden" }}
							>
								<p className="marker-waypoint__info-card-text">
									{placeGoogleData.name}
								</p>
								<PriceInfo price_level={placeGoogleData.price_level} />
								<RatingInfo ratingNum={placeGoogleData.rating} />
							</motion.div>
						)}

						{placeGoogleData && placeGoogleData.icon && (
							<motion.div
								className={`marker-waypoint__figure-card ${
									isHighlighted
										? "marker-waypoint__figure-card--highlighted"
										: ""
								}`}
								style={{
									visibility: markerFlipped ? "hidden" : "visible",
								}}
							>
								<img
									src={placeGoogleData.icon}
									alt=""
									className="place-card__icon"
								/>
							</motion.div>
						)}

						<motion.div
							className="marker-waypoint__location-name"
							style={{ visibility: markerFlipped ? "hidden" : "visible" }}
						>
							{placeData.name}
						</motion.div>
						<motion.img
							src={markerIcon}
							alt="waypoint marker"
							className="marker-waypoint__icon"
						/>
					</motion.div>
				</motion.div>
			</MapMarker>
		)
	);
}

export default MapMarkerWaypoint;
