import "./MapButtonGroup.scss";

import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";

import {
	setShowRouteControlMenu,
	setShowRouteDetailsPanel,
} from "../../store/layout/layoutSlice";
import {
	selectShowRouteControlMenu,
	selectShowRouteDetailsPanel,
} from "../../store/layout/layoutSelector";
import { selectSelectedRoute } from "../../store/route/routeSelector";
import { setSelectedRoute } from "../../store/route/routeSlice";
import {
	setNavigationMode,
	setNavigationModeLoading,
	setWalkingMode,
	setWalkingModeLoading,
} from "../../store/map/mapSlice";
import {
	selectNavigationMode,
	selectNavigationModeLoading,
	selectWalkingMode,
	selectAllowGeolocation,
} from "../../store/map/mapSelector";

import MapButton from "../MapButton/MapButton";

function MapButtonGroup({ mapRef }) {
	const dispatch = useDispatch();
	const controlMenuExpanded = useSelector(selectShowRouteControlMenu);
	const routeDetailsPanelExpanded = useSelector(selectShowRouteDetailsPanel);
	const hasSelectedRoute = useSelector(selectSelectedRoute);
	const navigationMode = useSelector(selectNavigationMode);
	const navigationModeLoading = useSelector(selectNavigationModeLoading);
	const walkingMode = useSelector(selectWalkingMode);
	const allowedGeolocation = useSelector(selectAllowGeolocation);

	const handleShowRouteDetailsPanel = () => {
		if (!routeDetailsPanelExpanded) {
			dispatch(setShowRouteDetailsPanel(true));
		}
		if (controlMenuExpanded) {
			dispatch(setShowRouteControlMenu(false));
		}
	};

	const handleShowControlPanel = () => {
		if (routeDetailsPanelExpanded) {
			dispatch(setShowRouteDetailsPanel(false));
		}
		if (!controlMenuExpanded) {
			dispatch(setShowRouteControlMenu(true));
		}
	};

	const handleToggleNavigationMode = () => {
		dispatch(setNavigationMode(!navigationMode));
		dispatch(setNavigationModeLoading(true));
	};

	const handleZoom = useCallback(
		(isZoomIn) => {
			const prevZoom = mapRef.current.zoom;
			let newZoom;
			if (isZoomIn) {
				newZoom = prevZoom !== 0 ? prevZoom - 1 : 0;
			} else {
				newZoom = prevZoom + 1;
			}

			mapRef.current.setZoom(newZoom);
		},
		[mapRef]
	);

	const handleToggleWalkingMode = () => {
		if (walkingMode) {
			dispatch(setSelectedRoute(null));
		}
		dispatch(setWalkingModeLoading(true));
		dispatch(setWalkingMode(!walkingMode));
	};

	return (
		<>
			<div className="map-button-group map-button-group--panel-sticky">
				{hasSelectedRoute && (
					<>
						<MapButton
							iconName={"search"}
							onClickFunc={handleShowControlPanel}
							cssClassName={"map-button-group__search-button"}
							isActiveState={false}
						/>

						{allowedGeolocation && (
							<MapButton
								iconName={"walk"}
								onClickFunc={handleToggleWalkingMode}
								cssClassName={"map-button-group__start-button"}
								isActiveState={walkingMode}
							/>
						)}
					</>
				)}
				{hasSelectedRoute && controlMenuExpanded && (
					<MapButton
						iconName={"pin_drop"}
						onClickFunc={handleShowRouteDetailsPanel}
						cssClassName={"map-button-group__route-button"}
						isActiveState={false}
					/>
				)}
				{allowedGeolocation && (
					<MapButton
						iconName={"compass"}
						onClickFunc={handleToggleNavigationMode}
						cssClassName={"map-button-group__current-button"}
						isActiveState={navigationMode}
						isLoadingState={navigationModeLoading}
					/>
				)}
			</div>
			<div className="map-button-group map-button-group--map-sticky">
				<MapButton
					iconName={"add"}
					cssClassName={"map-button-group__zoomOut-button"}
					isActiveState={false}
					onClickFunc={() => handleZoom(false)}
				/>

				<MapButton
					iconName={"minus"}
					cssClassName={"map-button-group__zoomIn-button"}
					isActiveState={false}
					onClickFunc={() => handleZoom(true)}
				/>
			</div>
		</>
	);
}

export default MapButtonGroup;
