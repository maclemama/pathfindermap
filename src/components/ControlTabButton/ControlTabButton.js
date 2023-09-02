import { motion } from "framer-motion";
import "./ControlTabButton.scss";
import SVGIcons from "../SVGIcons/SVGIcons";

function ControlTabButton({ tabName, setActiveTag, activeTab, activeColor }) {
	return (
		<motion.button
			whileHover={{
				scale: 1.1,
				transition: { duration: 0.5 },
			}}
			whileTap={{ scale: 0.9 }}
			className={`control-button ${
				activeTab === tabName ? "control-button--active" : ""
			}`}
			onClick={() => setActiveTag(tabName)}
			style={{"--underline":activeColor}}
		>
			<SVGIcons iconName={tabName} cssClassName="control-button__icon" />
			<h4 className="control-button__text">{tabName}</h4>
		</motion.button>
	);
}

export default ControlTabButton;
