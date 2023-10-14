import { CircleF } from "@react-google-maps/api";
import { useMemo } from "react";
import { useSelector } from "react-redux";

import { selectMapRadius } from "../../store/map/mapSelector";
import { selectRoutes } from "../../store/route/routeSelector";

function MapRadius({ startingPoint }) {
	const mapRadius = useSelector(selectMapRadius);
	const routes = useSelector(selectRoutes);

	const circleOptions = useMemo(
		() => ({
			strokeOpacity: 0.5,
			strokeWeight: 2,
			clickable: false,
			draggable: false,
			editable: false,
			visible: true,
			zIndex: 3,
			fillOpacity: 0.05,
			strokeColor: "#8BC34A",
			fillColor: "#8BC34A",
		}),
		[]
	);

	return (
		!!routes || (
			<CircleF
				center={startingPoint}
				radius={mapRadius}
				options={circleOptions}
			/>
		)
	);
}

export default MapRadius;
