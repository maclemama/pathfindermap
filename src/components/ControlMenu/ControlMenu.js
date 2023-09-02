import { useMemo, useState } from "react";
import { motion, useDragControls } from "framer-motion";
import "./ControlMenu.scss";
import ControlTabs from "../ControlTabs/ControlTabs";
import ControlStartingPoint from "../ControlStartingPoint/ControlStartingPoint";
import RouteSearchPanel from "../RouteSearchPanel/RouteSearchPanel";
import axios from "axios";
import SVGIcons from "../SVGIcons/SVGIcons";

function ControlMenu({
	startingPoint,
	setStartingPoint,
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

		console.log(payload);
		axios
			.post(process.env.REACT_APP_SERVER_URL + "/query", payload)
			.then((res) => {
				console.log(res.data);
				setRoutes(res.data);
			});
	};

	const [positionY, setPositionY] = useState("0%");
	// const [positionY, setPositionY] = useState(500);
	const [isCollapse, setIsCollapse] = useState(true);
	const controls = useDragControls();

	const toggleShowHide = () => {
		if (positionY === "0%") {
			// setPositionY(500);
			setIsCollapse(true);
			setPositionY("90%");
		} else {
			// setPositionY(0);
			setPositionY("0%");
			setIsCollapse(false);
		}
	};

	const handleDrag = () => {
		setIsCollapse(true);
	};
	return (
		<section className="control-menu">
			<motion.div
				className="box"
				animate={{ y: positionY }}
				transition={{ type: "spring", damping: 15 }}
				drag="y"
				dragControls={controls}
				dragConstraints={{ top: 0, bottom: 450 }}
				onDrag={handleDrag}
			>
				<div className="control-menu__group">
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
							cssClassName={`control-menu__icon ${
								isCollapse ? "control-menu__icon--active" : ""
							} `}
						/>
						<SVGIcons
							iconName="collapse"
							cssClassName={`control-menu__icon ${
								isCollapse ? "" : "control-menu__icon--active"
							} `}
						/>
					</motion.button>
					<ControlStartingPoint
						setStartingPoint={setStartingPoint}
						setIsCurrentLoaction={setIsCurrentLoaction}
						setCurrentLocationAsStart={setCurrentLocationAsStart}
					/>
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
			</motion.div>
		</section>
	);
}

export default ControlMenu;
