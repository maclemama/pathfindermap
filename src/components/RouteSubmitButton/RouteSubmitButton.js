import "./RouteSubmitButton.scss";
import { motion } from "framer-motion";

function RouteSubmitButton({ onClickFunc }) {
	return (
		<motion.button
			className="route-submit-button"
			type="submit"
			onClick={onClickFunc}
			whileHover={{
				scale: 1.05,
				transition: { duration: 0.3 },
			}}
			whileTap={{ scale: 0.9 }}
		>
			Find Path
		</motion.button>
	);
}

export default RouteSubmitButton;
