import { motion } from "framer-motion";

function MotionButton({onClickFunc, cssClassName, buttonType, buttonContent, disabled}) {
	return (
		<motion.button
			className={`motion-bottom ${cssClassName} ${disabled ? "motion-bottom--disable" : ""}`}
			type={buttonType}
			onClick={onClickFunc}
			whileHover={!disabled ? {
				scale: 1.05,
				transition: { duration: 0.3 },
			}:{}}
			whileTap={!disabled ? { scale: 0.9 }:{}}
			disabled={disabled}
		>
			{buttonContent.map(content=>content)}
		</motion.button>
	);
}

export default MotionButton;
