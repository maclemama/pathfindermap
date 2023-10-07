import "./MapButtonGroup.scss";

import { useDispatch, useSelector } from "react-redux";

import {
	setShowRouteControlMenu,
	setShowRouteDetailsPanel,
} from "../../store/layout/layoutSlice";
import {
	selectShowRouteControlMenu,
	selectShowRouteDetailsPanel,
} from "../../store/layout/layoutSelector";
import { selectSelectedRoute } from "../../store/route/routeSelector";
import {
	setNavigationMode,
	setNavigationModeLoading,
} from "../../store/map/mapSlice";
import {
	selectNavigationMode,
	selectNavigationModeLoading,
} from "../../store/map/mapSelector";

import MapButton from "../MapButton/MapButton";

function MapButtonGroup() {
	const dispatch = useDispatch();
	const controlMenuExpanded = useSelector(selectShowRouteControlMenu);
	const routeDetailsPanelExpanded = useSelector(selectShowRouteDetailsPanel);
	const hasSelectedRoute = useSelector(selectSelectedRoute);
	const navigationMode = useSelector(selectNavigationMode);
	const navigationModeLoading = useSelector(selectNavigationModeLoading);

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
	return (
		<div className="map-button-group">
			{hasSelectedRoute && (
				<>
					<MapButton
						iconName={"search"}
						onClickFunc={handleShowControlPanel}
						cssClassName={"map-button-group__search-button"}
						isActiveState={false}
					/>

					<MapButton
						iconName={"start"}
						onClickFunc={() => console.log("press start")}
						cssClassName={"map-button-group__start-button"}
						isActiveState={false}
					/>
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
			<MapButton
				iconName={"near_me"}
				onClickFunc={handleToggleNavigationMode}
				cssClassName={"map-button-group__current-button"}
				isActiveState={navigationMode}
				isLoadingState={navigationModeLoading}
			/>
		</div>
	);
}

export default MapButtonGroup;
