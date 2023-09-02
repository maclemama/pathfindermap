import "./RouteSubmitButton.scss";
import { motion } from "framer-motion";

function RouteSubmitButton({ onClickFunc }) {
	return (
		<motion.button
			className="route-submit-button"
			type="submit"
			onClick={onClickFunc}
			whileHover={{
				scale: 1.2,
				transition: { duration: 1 },
			}}
			whileTap={{ scale: 0.9 }}
		>
			Find Path
		</motion.button>
	);
}

export default RouteSubmitButton;
