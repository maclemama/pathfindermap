import { motion } from "framer-motion";
import SVGIcons from "../SVGIcons/SVGIcons";
import "./MapButton.scss";

function MapButton({ buttonText, iconName, onClickFunc, isActiveState }){
    return (
        <motion.button
			whileHover={{
				scale: 1.2,
				transition: { duration: 1 },
			}}
			whileTap={{ scale: 0.9 }}
			className={`map-button ${
				isActiveState ? "map-button--active" : ""
			}`}
			onClick={onClickFunc}
		>
			<SVGIcons iconName={iconName} cssClassName="map-button__icon" />
			<h4 className="map-button__text">{buttonText}</h4>
		</motion.button>
    )
}

export default MapButton;