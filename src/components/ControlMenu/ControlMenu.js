import { useMemo, useState } from "react";
import "./ControlMenu.scss";
import ControlTabs from "../ControlTabs/ControlTabs";
import ControlStartingPoint from "../ControlStartingPoint/ControlStartingPoint";
import RouteSearchPanel from "../RouteSearchPanel/RouteSearchPanel";

function ControlMenu({
	startingPoint,
	setStartingPoint,
	isCurrentLocation,
	setIsCurrentLoaction,
	setCurrentLocationAsStart
}) {
	const tabNames = useMemo(() => ["search", "mood", "shuffle"], []);
	const [activeTab, setActiveTag] = useState(tabNames[0]);
	return (
		<section className="control-menu">
			<div className="control-menu__group">
				<ControlStartingPoint
					startingPoint={startingPoint}
					setStartingPoint={setStartingPoint}
					isCurrentLocation={isCurrentLocation}
					setIsCurrentLoaction={setIsCurrentLoaction}
					setCurrentLocationAsStart={setCurrentLocationAsStart}
				/>
			</div>
			<div className="control-menu__group">
				<div className="control-menu__tab">
						{activeTab === tabNames[0] && (
							<RouteSearchPanel/>
						)}

						{activeTab === tabNames[1] && (
							<h1>this is {activeTab}, the second tab</h1>
						)}

						{activeTab === tabNames[2] && (
							<h1>this is {activeTab}, the third tab</h1>
						)}
				</div>
				<ControlTabs
					tabNames={tabNames}
					setActiveTag={setActiveTag}
					activeTab={activeTab}
				/>
			</div>
		</section>
	);
}

export default ControlMenu;
