import { useSelector, useDispatch } from "react-redux";
import { PolylineF } from "@react-google-maps/api";
import { useEffect } from "react";

import { setWalkingCurrentDestination } from "../../store/map/mapSlice";
import { selectWalkingCurrentDestination } from "../../store/map/mapSelector";
import { centerMap } from "../../scripts/mapUtils";
import DirectionInfoBox from "../DirectionInfoBox/DirectionInfoBox";

function RouteWalkingPolyline({ walkingDirection, mapRef }) {
	const dispatch = useDispatch();
	const { position, isFinalStop, isArrived, positionIndex } = useSelector(
		selectWalkingCurrentDestination
	);
	const { steps } = walkingDirection;
	const currentStep = steps[positionIndex];
	const isEnded = isFinalStop && isArrived;
	if (!position || isArrived) {
		const newPosition = {
			position: null,
			isFinalStop: false,
			positionIndex: null,
			isArrived: false,
		};
		let newPositionEndPoint;

		if (!position) {
			newPositionEndPoint = steps?.[0]?.end_point;
			newPosition.positionIndex = 0;
			if (steps.length === 1) newPosition.isFinalStop = true;
		}

		if (isArrived && !isFinalStop) {
			newPosition.positionIndex = positionIndex + 1;
			newPositionEndPoint = steps?.[positionIndex + 1]?.end_point;
			if (positionIndex + 1 === steps.length) newPosition.isFinalStop = true;
		}

		if (newPositionEndPoint) {
			newPosition.position = {
				lat: newPositionEndPoint.lat(),
				lng: newPositionEndPoint.lng(),
			};
		}

		if (!isEnded) {
			dispatch(setWalkingCurrentDestination(newPosition));
		}
	}

	if (currentStep) {
		centerMap([currentStep.end_point], currentStep.start_point, mapRef, true);
	}

	return (
		currentStep && (
			<section className="walking_layer">
				<PolylineF
					path={currentStep.path}
					options={{
						strokeOpacity: 0,
						strokeWeight: 6,
						zIndex: "100000",
						icons: [
							{
								icon: {
									path: "M -2,2 2,2 0,-2 -2,2",
									strokeOpacity: 0.8,
									strokeColor: "white",
									strokeWeight: 3,
									scale: 6,
									fillColor: "green",
									fillOpacity: 1,
								},
								offset: "0",
								repeat: "30px",
							},
							{
								icon: {
									path: window.google.maps.SymbolPath.CIRCLE,
									strokeOpacity: 1,
									strokeColor: "white",
									strokeWeight: 3,
									scale: 10,
									fillColor: "blue",
									fillOpacity: 1,
								},
								offset: "100%",
							},
						],
					}}
				/>
				<DirectionInfoBox
					currentStep={currentStep}
					positionIndex={positionIndex}
					isEnded={isEnded}
				/>
			</section>
		)
	);
}

export default RouteWalkingPolyline;
