import { useState, useRef, useEffect } from "react";
import { motion, useDragControls } from "framer-motion";
import "./ControlMenu.scss";
import ControlMenuGroup from "../ControlMenuGroup/ControlMenuGroup";

function ControlMenu({
	startingPoint,
	setStartingPoint,
	setIsCurrentLoaction,
	setCurrentLocationAsStart,
	setRoutes,
	setMapRadius,
	isDesktop,
}) {
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

	return (
		<section className="control-menu" ref={sectionRef}>
			<div className="control-menu__wrapper--mobile">
				<motion.div
					className="control-menu__dragable-box"
					animate={{ y: positionY }}
					transition={{ type: "spring", damping: 20 }}
					drag={"y"}
					dragControls={controls}
					dragConstraints={{ top: 0, bottom: maxPositionY }}
					onDrag={handleDrag}
				>
					<ControlMenuGroup
						startingPoint={startingPoint}
						setStartingPoint={setStartingPoint}
						setIsCurrentLoaction={setIsCurrentLoaction}
						setCurrentLocationAsStart={setCurrentLocationAsStart}
						setRoutes={setRoutes}
						setMapRadius={setMapRadius}
						isCollapse={isCollapse}
						toggleShowHide={toggleShowHide}
						isDesktop={isDesktop}
					/>
				</motion.div>
			</div>

			<div className="control-menu__wrapper--desktop">
			<ControlMenuGroup
					startingPoint={startingPoint}
					setStartingPoint={setStartingPoint}
					setIsCurrentLoaction={setIsCurrentLoaction}
					setCurrentLocationAsStart={setCurrentLocationAsStart}
					setRoutes={setRoutes}
					setMapRadius={setMapRadius}
					isCollapse={isCollapse}
					toggleShowHide={toggleShowHide}
					isDesktop={isDesktop}
				/>
			</div>
		</section>
	);
}

export default ControlMenu;
