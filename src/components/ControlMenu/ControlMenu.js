import { useMemo, useState, useRef, useEffect } from "react";
import { motion, useDragControls } from "framer-motion";
import "./ControlMenu.scss";
import ControlTabs from "../ControlTabs/ControlTabs";
import ControlStartingPoint from "../ControlStartingPoint/ControlStartingPoint";
import RouteSearchPanel from "../RouteSearchPanel/RouteSearchPanel";
import axios from "axios";
import SVGIcons from "../SVGIcons/SVGIcons";
import RouteMoodPanel from "../RouteMoodPanel/RouteMoodPanel";
import RouteRandomPanel from "../RouteRandomPanel/RouteRandomPanel";

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
	const [allFormReset, setAllFormReset] = useState(0);

	const [positionY, setPositionY] = useState(-50);
	const [maxPositionY, setMaxPositionY] = useState(0);
	const [isCollapse, setIsCollapse] = useState(true);
	const controls = useDragControls();
	const sectionRef = useRef(null);

	useEffect(() => {
		if (!sectionRef.current) return;
		const resizeObserver = new ResizeObserver(() => {
			const newMaxPositionY = sectionRef.current.offsetHeight - 100;
			setMaxPositionY(newMaxPositionY);
		});
		resizeObserver.observe(sectionRef.current);
		return () => resizeObserver.disconnect();
	}, []);

	const toggleShowHide = () => {
		if (positionY === -50) {
			setPositionY(maxPositionY);
			setIsCollapse(true);
		} else {
			setPositionY(-50);
			setIsCollapse(false);
		}
	};

	const handleDrag = () => {
		setIsCollapse(true);
	};

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
		<section className="control-menu" ref={sectionRef}>
			<motion.div
				className="control-menu__dragable-box"
				animate={{ y: positionY }}
				transition={{ type: "spring", damping: 15 }}
				drag="y"
				dragControls={controls}
				dragConstraints={{ top: 0, bottom: maxPositionY }}
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
			</motion.div>
		</section>
	);
}

export default ControlMenu;
