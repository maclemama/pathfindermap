import "./RouteCardPathItem.scss";

import downIcon from "../../assets/icons/down.svg";
import SVGIcons from "../SVGIcons/SVGIcons";

function RouteCardPathItem({ position, locationName, label }) {
	return (
		<div className="path-item">
			<div className="path-item__icon-wrapper">
				{position !== 1 && (
					<SVGIcons iconName={"down"} cssClassName={"path-item__icon"} />
				)}
			</div>
			<div className="path-item__location-wrapper">
				<div className="path-item__left-wrapper">
					<div className="path-item__position-wrapper">
						<p className="path-item__position">{position}</p>
					</div>
					<div className="path-item__label-wrapper">
						<p className="path-item__label">{label}</p>
					</div>
				</div>
				<div className="path-item__name-wrapper">
					<p className="path-item__location">{locationName}</p>
				</div>
			</div>
		</div>
	);
}

export default RouteCardPathItem;
