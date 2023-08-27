import { motion } from "framer-motion";
import "./ControlTabButton.scss";
import locationIcon from "../../assets/icons/add_location.svg";
import moodIcon from "../../assets/icons/mood.svg";
import diceIcon from "../../assets/icons/dice.svg";

function ControlTabButton({ tabName, setActiveTag, activeTab }) {
	const icons = {
		search: locationIcon,
		mood: moodIcon,
		shuffle: diceIcon,
	};
	return (
		<motion.button
			whileHover={{
				scale: 1.2,
				transition: { duration: 1 },
			}}
			whileTap={{ scale: 0.9 }}
			className={`control-button ${activeTab === tabName ? "control-button--active" : ""}`}
			onClick={() => setActiveTag(tabName)}
		>
			<img src={icons[tabName]} alt="" className="control-button__icon" />
            <h4 className="control-button__text">{tabName}</h4>
		</motion.button>
	);
}

export default ControlTabButton;
