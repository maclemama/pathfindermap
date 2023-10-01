import "./MapButtonGroup.scss";

import { useDispatch, useSelector } from "react-redux";

import { setShowRouteControlMenu } from "../../store/layout/layoutSlice";
import { setShowRouteDetailsPanel } from "../../store/layout/layoutSlice";
import { selectShowRouteControlMenu } from "../../store/layout/layoutSelector";
import { selectShowRouteDetailsPanel } from "../../store/layout/layoutSelector";
import { selectSelectedRoute } from "../../store/route/routeSelector";

import MapButton from "../MapButton/MapButton";

function MapButtonGroup() {
	const dispatch = useDispatch();
	const controlMenuExpanded = useSelector(selectShowRouteControlMenu);
	const routeDetailsPanelExpanded = useSelector(selectShowRouteDetailsPanel);
	const hasSelectedRoute = useSelector(selectSelectedRoute);

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
	return (
		<div className="map-button-group">
			{hasSelectedRoute && (
				<>
					<MapButton
						iconName={"search"}
						onClickFunc={handleShowControlPanel}
						cssClassName={"map-button-group__search-button"}
						isActiveState={true}
					/>

					<MapButton
						iconName={"start"}
						onClickFunc={() => console.log("press start")}
						cssClassName={"map-button-group__start-button"}
						isActiveState={true}
					/>
				</>
			)}
			{hasSelectedRoute && controlMenuExpanded && (
				<MapButton
					iconName={"pin_drop"}
					onClickFunc={handleShowRouteDetailsPanel}
					cssClassName={"map-button-group__route-button"}
					isActiveState={true}
				/>
			)}
			<MapButton
				iconName={"near_me"}
				onClickFunc={() => console.log("press current location")}
				cssClassName={"map-button-group__current-button"}
				isActiveState={true}
			/>
		</div>
	);
}

export default MapButtonGroup;
