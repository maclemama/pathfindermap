import { motion } from "framer-motion";

function Loading() {
	const loadingContainerVariants = {
		start: {
			transition: {
				staggerChildren: 0.1,
			},
		},
		end: {
			transition: {
				staggerChildren: 0.1,
			},
		},
	};
	const loadingCircleTransition = {
		duration: 0.5,
		ease: "easeInOut",
		repeat: Infinity,
	};

	const loadingCircleVariants = {
		start: {
			y: "0%",
		},
		end: {
			y: "100%",
		},
	};

	const loadingCircle = {
		display: "inline-block",
		width: "0.5rem",
		height: "0.5rem",
		borderRadius: "0.25rem",
		backgroundColor: "red",
		margin: "0.1rem",
	};

	const loadingContainer = {
		display: "flex",
		position: "absolute",
		top: "0",
		right: "2rem",
        zIndex:1000
	};

	return (
		<motion.div
			style={loadingContainer}
			variants={loadingContainerVariants}
			initial="start"
			animate="end"
		>
			<motion.span
				style={loadingCircle}
				variants={loadingCircleVariants}
				transition={loadingCircleTransition}
			/>
			<motion.span
				style={loadingCircle}
				variants={loadingCircleVariants}
				transition={loadingCircleTransition}
			/>
			<motion.span
				style={loadingCircle}
				variants={loadingCircleVariants}
				transition={loadingCircleTransition}
			/>
		</motion.div>
	);
}

export default Loading;
