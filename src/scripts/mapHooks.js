import { useEffect, useState, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectStartingPoint } from "../store/startingPoint/startingPointSelector";
import {
	selectRoutes,
	selectPlaces,
	selectDirectionConfigs,
	selectSelectedRoute,
} from "../store/route/routeSelector";
import { setSelectedRoute, setWalkingInfo } from "../store/route/routeSlice";
import { generateDirection } from "../scripts/routeUtils";
import { selectWalkingMode } from "../store/map/mapSelector";
import { setWalkingModeLoading } from "../store/map/mapSlice";
import { centerMap, changeMapZoom } from "../scripts/mapUtils";

export const useShowRoute = (mapRef) => {
	const dispatch = useDispatch();
	const startingPoint = useSelector(selectStartingPoint);
	const routes = useSelector(selectRoutes);
	const places = useSelector(selectPlaces);
	const directionConfigs = useSelector(selectDirectionConfigs);
	const selectedRoute = useSelector(selectSelectedRoute);
	const walkingMode = useSelector(selectWalkingMode);
	const [directions, setDirections] = useState([]);
	let isShowAllRoute = !walkingMode;
	let [walkingDirection, setWalkingDirection] = useState(null);

	const handleSelectedRouteChange = useCallback(() => {
		if (selectedRoute && directions[0]) {
			const selectedDirection = directions.filter(
				(direction) => direction.route_id === selectedRoute
			)?.[0];
			changeMapZoom(selectedDirection, mapRef);
			isShowAllRoute = false;
		} else {
			places && startingPoint && centerMap(places, startingPoint, mapRef);
			isShowAllRoute = true;
		}
	}, [selectedRoute, directions, places, changeMapZoom, centerMap]);

	const walkingDetails = useMemo(() => {
		if (walkingMode && !walkingDirection) {
			const walkingDetails = directions.filter(
				(direction) => direction.route_id === selectedRoute
			)?.[0]?.routes?.[0]?.legs?.[0];
			return walkingDetails;
		}
	}, [walkingMode, walkingDirection, directions]);

	useEffect(() => {
		if (walkingMode && !walkingDirection) {
			setWalkingDirection(walkingDetails);
			dispatch(setWalkingModeLoading(false));
			isShowAllRoute = false;
		} else {
			if (routes && routes[0] && startingPoint && mapRef) {
				const fetchDirections = async () => {
					const directionsData = await generateDirection(directionConfigs);
					setDirections(directionsData);
					const walkingInfo = directionsData.map(
						({ walking_time, walking_distance, route_id, polyline, summary }) => ({
							walking_distance,
							walking_time,
							route_id,
							summary,
							polyline
						})
					);
					dispatch(setWalkingInfo(walkingInfo));
				};
				fetchDirections();
				isShowAllRoute = true;
				// reposition map zoom to fit all the locations
				centerMap(places, startingPoint, mapRef);

				if (routes.length === 1) {
					dispatch(setSelectedRoute(routes[0].route_id));
				}
			} else {
				setDirections([]);
			}
			setWalkingDirection(null);
		}
	}, [routes, walkingMode]);

	if (selectedRoute) {
		handleSelectedRouteChange();
	}

	return [places, directions, selectedRoute, isShowAllRoute, walkingDirection];
};
