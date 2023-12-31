import "./PlaceCard.scss";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	setPlaceSessionData,
	getPlaceSessionData,
} from "../../scripts/sessionStorage";
import { selectHighlightedPlace } from "../../store/route/routeSelector";
import { setHighlightedPlace } from "../../store/route/routeSlice";

import storeIcon from "../../assets/icons/storefront.svg";
import placeholderPhoto from "../../assets/images/placeholder.png";
import { PriceInfo, RatingInfo } from "../PlaceInfo/PlaceInfo";

function PlaceCard({ placeData, mapRef, routeID }) {
	const dispatch = useDispatch();
	const [placeGoogleData, setPlaceGoogleData] = useState(null);
	const highlighedPlace = useSelector(selectHighlightedPlace);
	const routePlaceID = routeID + placeData.place_id;
	const isHighlighted = highlighedPlace === routePlaceID;

	useEffect(() => {
		const storedPlace = getPlaceSessionData(placeData.place_id);
		const hasData = storedPlace ? storedPlace : false;
		if (!hasData) {
			const service = new window.google.maps.places.PlacesService(
				mapRef.current
			);
			if (service) {
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
			}
		} else {
			setPlaceGoogleData(JSON.parse(hasData));
		}
	}, []);

	const handlePlaceCardClick = () => {
		dispatch(
			setHighlightedPlace(routePlaceID === highlighedPlace ? "" : routePlaceID)
		);
	};
	return (
		placeGoogleData && (
			<article
				className={`place-card ${
					isHighlighted ? "place-card--highlighted" : ""
				}`}
				onClick={handlePlaceCardClick}
			>
				<figure className="place-card__photo-wrapper">
					<img
						src={
							placeGoogleData.photo ? placeGoogleData.photo : placeholderPhoto
						}
						alt={placeData.name}
						className="place-card__photo"
					/>
					<div className="place-card__photo-keyword-overlay">
						{placeData.query_mood || placeData.query_keyword || "Shuffle Place"}
					</div>
				</figure>
				<div className="place-card__content">
					<div className="place-card__content-top-wrapper">
						<h4 className="place-card__name">{placeGoogleData.name}</h4>
						{placeGoogleData.icon && (
							<div className="place-card__icon-wrapper">
								<img
									src={placeGoogleData.icon}
									alt=""
									className="place-card__icon"
								/>
							</div>
						)}
					</div>
					<div className="place-card__content-middle-wrapper">
						<div className="place-card__rating-wrapper">
							{placeGoogleData.price_level && (
								<div className="place-card__info">
									<p className="place-card__info-title">Price:</p>
									<PriceInfo price_level={placeGoogleData.price_level} />
								</div>
							)}
							{placeGoogleData.rating && (
								<div className="place-card__info">
									<p className="place-card__info-title">Rating:</p>
									<RatingInfo ratingNum={placeGoogleData.rating} />
								</div>
							)}
						</div>
						<div className="place-card__info-wrapper">
							{placeGoogleData.formatted_address && (
								<div className="place-card__info">
									<p className="place-card__info-title">Address:</p>
									<p className="place-card__info-text">
										{placeGoogleData.formatted_address}
									</p>
								</div>
							)}
							{placeGoogleData.formatted_phone_number && (
								<div className="place-card__info">
									<p className="place-card__info-title">Phone:</p>
									<p className="place-card__info-text">
										{placeGoogleData.formatted_phone_number}
									</p>
								</div>
							)}
						</div>
					</div>
					<div className="place-card__content-bottom-wrapper">
						{placeGoogleData.website && (
							<div className="place-card__icon-wrapper">
								<Link to={placeGoogleData.website} target="_blank">
									<img
										src={storeIcon}
										alt="Website of this store"
										className="place-card__icon"
									/>
								</Link>
							</div>
						)}

						{placeGoogleData.open_now && (
							<p className="place-card__open-now">Open Now 🟢</p>
						)}
					</div>
				</div>
			</article>
		)
	);
}

export default PlaceCard;
