import { motion } from "framer-motion";
import SVGIcons from "../SVGIcons/SVGIcons";
import "./MapButton.scss";

function MapButton({ buttonText, iconName, onClickFunc, isActiveState, cssClassName }){
    return (
        <motion.button
			whileHover={{
				scale: 1.1,
				transition: { duration: 0.1 },
			}}
			whileTap={{ scale: 0.9 }}
			className={`${cssClassName} map-button ${
				isActiveState ? "map-button--active" : ""
			}`}
			onClick={onClickFunc}
		>
			<SVGIcons iconName={iconName} cssClassName="map-button__icon" />
			{buttonText && <h4 className="map-button__text">{buttonText}</h4>}
		</motion.button>
    )
}

export default MapButton;