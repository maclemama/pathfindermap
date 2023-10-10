import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectStartingPoint } from "../store/startingPoint/startingPointSelector";
import {
	selectRoutes,
	selectPlaces,
	selectDirectionConfigs,
	selectSelectedRoute,
} from "../store/route/routeSelector";
import { setSelectedRoute, setWalkingInfo, resetRoute } from "../store/route/routeSlice";
import { generateDirection } from "../scripts/routeUtils";
import { centerMap, changeMapZoom } from "../scripts/mapUtils";

export const useShowRoute = (mapRef) => {
	const dispatch = useDispatch();
	const startingPoint = useSelector(selectStartingPoint);
	const routes = useSelector(selectRoutes);
	const places = useSelector(selectPlaces);
	const directionConfigs = useSelector(selectDirectionConfigs);
	const selectedRoute = useSelector(selectSelectedRoute);
	const [directions, setDirections] = useState([]);
	const [isShowAllRoute, setIsShowAllRoute] = useState(true);

	const handleSelectedRouteChange = useCallback(() => {
		if (selectedRoute && directions[0]) {
			const selectedDirection = directions.filter(
				(direction) => direction.route_id === selectedRoute
			)?.[0];
			changeMapZoom(selectedDirection, mapRef);
			setIsShowAllRoute(false);
		} else {
			places && startingPoint && centerMap(places, startingPoint, mapRef);
			setIsShowAllRoute(true);
		}
	}, [
		selectedRoute,
		directions,
		places,
		changeMapZoom,
		setIsShowAllRoute,
		centerMap,
	]);

	useEffect(() => {
		if (routes && startingPoint && mapRef) {
			if (routes[0]) {
				const fetchDirections = async () => {
					const directionsData = await generateDirection(directionConfigs);
					//TODO
					//console.log(directionsData);
					setDirections(directionsData);
					const walkingInfo = directionsData.map(
						({ walking_time, walking_distance, route_id }) => ({
							walking_distance,
							walking_time,
							route_id,
						})
					);
					dispatch(setWalkingInfo(walkingInfo));
				};
				fetchDirections();
				setIsShowAllRoute(true);
				// reposition map zoom to fit all the locations
                console.log(startingPoint)
				centerMap(places, startingPoint, mapRef);

				if (routes.length === 1) {
					dispatch(setSelectedRoute(routes[0].route_id));
				}
			}
		} else {
			setDirections([]);
            // dispatch(resetRoute());

		}
	}, [routes]);

	useEffect(() => {
		handleSelectedRouteChange();
	}, [selectedRoute]);

	return [places, directions, selectedRoute, isShowAllRoute];
};
