import "./ControlMenuGroup.scss";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setModal } from "../../store/modal/modalSlice";
import { selectStartingPoint } from "../../store/startingPoint/startingPointSelector";
import { setRoutesDirectionsPlaces } from "../../store/route/routeSlice";
import { getRawRoutes } from "../../scripts/queryUtils";
import { generateRoutes } from "../../scripts/routeUtils";
import { resetRoute } from "../../store/route/routeSlice";

import ControlTabs from "../ControlTabs/ControlTabs";
import ControlStartingPoint from "../ControlStartingPoint/ControlStartingPoint";
import RouteSearchPanel from "../RouteSearchPanel/RouteSearchPanel";
import SVGIcons from "../SVGIcons/SVGIcons";
import RouteMoodPanel from "../RouteMoodPanel/RouteMoodPanel";
import RouteRandomPanel from "../RouteRandomPanel/RouteRandomPanel";
import logo from "../../assets/logos/logo-no-background.png";
import Loading from "../Loading/Loading";

function ControlMenuGroup({
	setCurrentLocationAsStart,
	isCollapse,
	toggleShowHide,
	isLoaded,
}) {
	const dispatch = useDispatch();
	const tabNames = useMemo(() => ["search", "mood", "shuffle"], []);
	const [activeTab, setActiveTag] = useState(tabNames[0]);
	const [allFormReset, setAllFormReset] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const startingPoint = useSelector(selectStartingPoint);

	const handleQuerySubmit = async (e, formValues, mode) => {
		e.preventDefault();
		setIsLoading(true);

		try {
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

			const rawRoutes = await getRawRoutes(payload);
			const routes = generateRoutes(rawRoutes, startingPoint);

			dispatch(setRoutesDirectionsPlaces(routes));
			setAllFormReset((prev) => prev + 1);
		} catch (error) {
			dispatch(
				setModal({
					title: "Error",
					message: error.response.data.message || error.message,
				})
			);
			dispatch(resetRoute());
		} finally {
			setIsLoading(false);
		}
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

			{isLoaded && (
				<ControlStartingPoint
					setCurrentLocationAsStart={setCurrentLocationAsStart}
				/>
			)}
			<div className="control-menu-group__tab">
				{activeTab === tabNames[0] && (
					<RouteSearchPanel
						handleQuerySubmit={handleQuerySubmit}
						allFormReset={allFormReset}
					/>
				)}

				{activeTab === tabNames[1] && (
					<RouteMoodPanel
						handleQuerySubmit={handleQuerySubmit}
						allFormReset={allFormReset}
					/>
				)}

				{activeTab === tabNames[2] && (
					<RouteRandomPanel handleQuerySubmit={handleQuerySubmit} />
				)}
			</div>
			{isLoading ? <Loading /> : <></>}
			<ControlTabs
				tabNames={tabNames}
				setActiveTag={setActiveTag}
				activeTab={activeTab}
			/>
		</div>
	);
}

export default ControlMenuGroup;
