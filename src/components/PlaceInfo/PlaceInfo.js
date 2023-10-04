import "./PlaceInfo.scss";

import moneyFillIcon from "../../assets/icons/money_fill.svg";
import moneyEmptyIcon from "../../assets/icons/money_empty.svg";
import starFillIcon from "../../assets/icons/star_fill.svg";
import starHalfFillIcon from "../../assets/icons/star_half.svg";
import starEmptyIcon from "../../assets/icons/star_empty.svg";

function PriceInfo({price_level}) {
	return (
		<div className="place-info">
			{[...Array(5)].map((_, index) => {
				const priceLevel = Number(price_level);
				return (
					<img
						src={priceLevel >= index + 1 ? moneyFillIcon : moneyEmptyIcon}
						className="place-info__icon"
						alt={`Store price level for this store is ${priceLevel}`}
						key={index}
					/>
				);
			})}
		</div>
	);
}

function RatingInfo({ratingNum}) {
	return (
		<div className="place-info">
			{[...Array(5)].map((_, index) => {
				const rating = Number(ratingNum);
				let icon;
				if (rating >= index + 1) {
					icon = starFillIcon;
				} else if (rating >= index + 0.5) {
					icon = starHalfFillIcon;
				} else {
					icon = starEmptyIcon;
				}
				return (
					<img
						src={icon}
						className="place-info__icon"
						alt={`Store rating for this store is ${rating}`}
						key={index}
					/>
				);
			})}
		</div>
	);
}

export { PriceInfo, RatingInfo };
