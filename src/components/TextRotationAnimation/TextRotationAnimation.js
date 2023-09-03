import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TextRotationAnimation = ({ textArray }) => {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const id = setInterval(() => {
			setIndex((state) => {
				if (state >= textArray.length - 1) return 0;
				return state + 1;
			});
		}, 3000);
		return () => clearInterval(id);
	}, []);

	return (
		<div>
			<AnimatePresence>
				<motion.div
					key={textArray[index]}
					initial={{ opacity: 0 }}
					animate={{  opacity: 1 , transition: { duration: 1 }}}
				>
					{textArray[index]}
				</motion.div>
			</AnimatePresence>
		</div>
	);
};

export default TextRotationAnimation;
