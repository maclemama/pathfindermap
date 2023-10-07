import "./MotionSpinner.scss";
import { motion } from "framer-motion";

function MotionSpinner({ cssClassName }) {
	return (
		<motion.div
			className={`motion-spinner ${cssClassName ? cssClassName : ""}`}
			animate={{ rotate: 360 }}
			transition={{
				rotate: {
					repeat: Infinity,
					ease: "linear",
					duration: 1,
				}
			}}
		/>
	);
}

export default MotionSpinner;
