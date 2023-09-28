import "./MotionButton.scss";
import { motion } from "framer-motion";

function MotionButton({onClickFunc, cssClassName, buttonType, buttonContent}) {
	return (
		<motion.button
			className={cssClassName}
			type={buttonType}
			onClick={onClickFunc}
			whileHover={{
				scale: 1.05,
				transition: { duration: 0.3 },
			}}
			whileTap={{ scale: 0.9 }}
		>
			{buttonContent.map(content=>content)}
		</motion.button>
	);
}

export default MotionButton;
