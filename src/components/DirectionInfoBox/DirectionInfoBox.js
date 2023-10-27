import "./DirectionInfoBox.scss";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { selectWalkingNextDestinationDistance } from "../../store/map/mapSelector";
import { selectShowRouteControlMenu } from "../../store/layout/layoutSelector";
import SVGIcons from "../SVGIcons/SVGIcons";

function DirectionInfoBox({ currentStep, positionIndex, isEnded }) {
	const controlMenuExpanded = useSelector(selectShowRouteControlMenu);
	const nextDestinationDistance = useSelector(
		selectWalkingNextDestinationDistance
	);

	const distancePercentage = Math.floor(
		((Number(currentStep?.distance.value) - Number(nextDestinationDistance)) /
			Number(currentStep?.distance.value)) *
			100
	);

	console.log(distancePercentage);

	return (
		<div
			className={`direction-info ${
				controlMenuExpanded ? "direction-info--with-menu" : ""
			}`}
		>
			<p className="direction-info__text">
				{isEnded
					? "Arrived destination"
					: `Step ${positionIndex + 1}: ${currentStep.instructions.replace(
							/(<([^>]+)>)/gi,
							""
					  )}`}
			</p>
			<div className="direction-info__top-wrapper">
				<div className="direction-info__animation-wrapper">
					<motion.div
						className="direction-info__walking-animation"
						initial={{ y: 0 }}
						animate={{ y: [1, 2, 3, 4, 3, 2, 1] }}
						exit={{ y: 0 }}
						transition={{
							duration: 1,
							ease: "easeInOut",
							repeat: Infinity,
						}}
						style={{
							"--distance":
								distancePercentage < 0 ? "0%" : distancePercentage + "%",
						}}
					>
						<SVGIcons
							cssClassName={"direction-info__animation-icon"}
							iconName={"walk"}
						/>
					</motion.div>
					<SVGIcons
						cssClassName={
							"direction-info__animation-icon direction-info__animation-icon--destination"
						}
						iconName={"destination"}
					/>
				</div>
				<div className="direction-info__distance-wrapper">
					<p className="direction-info__distance">{nextDestinationDistance}</p>
					<div className="direction-info__distance-right-wrapper">
						<p className="direction-info__distance-unit">
							{`meter${nextDestinationDistance > 1 ? "s" : "s"}`}
						</p>
						<p className="direction-info__distance-unit">away</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DirectionInfoBox;
