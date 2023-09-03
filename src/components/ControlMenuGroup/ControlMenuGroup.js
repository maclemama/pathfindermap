import "./ControlMenuGroup.scss";
import { motion } from "framer-motion";
import ControlTabs from "../ControlTabs/ControlTabs";
import ControlStartingPoint from "../ControlStartingPoint/ControlStartingPoint";
import RouteSearchPanel from "../RouteSearchPanel/RouteSearchPanel";
import SVGIcons from "../SVGIcons/SVGIcons";
import RouteMoodPanel from "../RouteMoodPanel/RouteMoodPanel";
import RouteRandomPanel from "../RouteRandomPanel/RouteRandomPanel";
import { useMemo, useState } from "react";
import axios from "axios";
import logo from "../../assets/logos/logo-no-background.png";
import { Link } from "react-router-dom";

function ControlMenuGroup({
	startingPoint,
	setStartingPoint,
	setIsCurrentLoaction,
	setCurrentLocationAsStart,
	setRoutes,
	setMapRadius,
	isCollapse,
	toggleShowHide,
	isDesktop,
}) {
	const tabNames = useMemo(() => ["search", "mood", "shuffle"], []);
	const [activeTab, setActiveTag] = useState(tabNames[0]);
	const [allFormReset, setAllFormReset] = useState(0);

	const handleQuerySubmit = (e, formValues, mode) => {
		e.preventDefault();
		const payload = {
			query_mode: formValues.query_mode,
			duration: formValues.duration,
			longitude: startingPoint.lng,
			latitude: startingPoint.lat,
			radius: formValues.radius,
			opennow_only: formValues.opennow_only,
			max_route: formValues.max_route,
		};
		if (mode === "keyword") {
			const keyword = Object.values(formValues.query_keyword);
			if (!keyword[0]) {
				return;
			}
			payload.query_keyword = keyword;
		}

		if (mode === "mood") {
			if (formValues.query_mood === "") {
				return;
			}
			payload.query_mood = formValues.query_mood;
		}

		console.log(payload);
		axios
			.post(process.env.REACT_APP_SERVER_URL + "/query", payload)
			.then((res) => {
				console.log(res.data);
				setRoutes(res.data);
				setAllFormReset(allFormReset + 1);
			});
	};

	return (
		<div className="control-menu-group">
			<button className="control-menu-group__home-button">
				<Link to="/">
					<img
						src={logo}
						alt="Pathfinder brand logo"
						className="control-menu-group__logo"
					/>
				</Link>
			</button>

			<div className="control-menu-group__toggle-wrapper">
				<motion.button
					whileHover={{
						scale: 1.4,
						transition: { duration: 1 },
					}}
					whileTap={{ scale: 0.8 }}
					onClick={toggleShowHide}
				>
					<SVGIcons
						iconName="expand"
						cssClassName={`control-menu-group__icon ${
							isCollapse ? "control-menu-group__icon--active" : ""
						} `}
					/>
					<SVGIcons
						iconName="collapse"
						cssClassName={`control-menu-group__icon ${
							isCollapse ? "" : "control-menu-group__icon--active"
						} `}
					/>
				</motion.button>
			</div>

			<ControlStartingPoint
				setStartingPoint={setStartingPoint}
				setIsCurrentLoaction={setIsCurrentLoaction}
				setCurrentLocationAsStart={setCurrentLocationAsStart}
			/>
			<div className="control-menu-group__tab">
				{activeTab === tabNames[0] && (
					<RouteSearchPanel
						handleQuerySubmit={handleQuerySubmit}
						setMapRadius={setMapRadius}
						allFormReset={allFormReset}
					/>
				)}

				{activeTab === tabNames[1] && (
					<RouteMoodPanel
						handleQuerySubmit={handleQuerySubmit}
						setMapRadius={setMapRadius}
						allFormReset={allFormReset}
					/>
				)}

				{activeTab === tabNames[2] && (
					<RouteRandomPanel
						handleQuerySubmit={handleQuerySubmit}
						setMapRadius={setMapRadius}
					/>
				)}
			</div>
			<ControlTabs
				tabNames={tabNames}
				setActiveTag={setActiveTag}
				activeTab={activeTab}
			/>
		</div>
	);
}

export default ControlMenuGroup;
