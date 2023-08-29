import { useMemo, useState } from "react";
import "./ControlMenu.scss";
import ControlTabs from "../ControlTabs/ControlTabs";
import ControlStartingPoint from "../ControlStartingPoint/ControlStartingPoint";
import RouteSearchPanel from "../RouteSearchPanel/RouteSearchPanel";
import axios from "axios";

function ControlMenu({
	startingPoint,
	setStartingPoint,
	isCurrentLocation,
	setIsCurrentLoaction,
	setCurrentLocationAsStart,
	setRoutes,
	setMapRadius,
}) {
	const tabNames = useMemo(() => ["search", "mood", "shuffle"], []);
	const [activeTab, setActiveTag] = useState(tabNames[0]);

	const handleQuerySubmit = (e, formValues, mode) => {
		e.preventDefault();
		const payload = {
			duration: formValues.duration,
			longitude: startingPoint.lng,
			latitude: startingPoint.lat,
			radius: formValues.radius,
			opennow_only: formValues.opennow_only,
		};
		if (mode === "keyword") {
			const keyword = Object.values(formValues.query_keyword);
			if (!keyword[0]) {
				return;
			}
			payload.query_keyword = keyword;
		}

		console.log(payload);
		axios
			.post(process.env.REACT_APP_SERVER_URL + "/query", payload)
			.then((res) => {
				console.log(res.data);
				setRoutes(res.data);
			});
	};
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
						<RouteSearchPanel
							handleQuerySubmit={handleQuerySubmit}
							setMapRadius={setMapRadius}
						/>
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
