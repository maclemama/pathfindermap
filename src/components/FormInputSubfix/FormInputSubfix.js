import SVGIcons from "../SVGIcons/SVGIcons";
import "./FormInputSubfix.scss";
import { motion } from "framer-motion";

function FormInputSubfix({ svgName , onClickfunc}) {
	return (
		<motion.button
			className="input-subfix-button"
			onClick={onClickfunc}
			whileHover={{
				scale: 1.2,
				transition: { duration: 0.3 },
			}}
			whileTap={{ scale: 0.9 }}
		>
			<SVGIcons iconName={svgName} cssClassName="input-subfix-button__icon" />
		</motion.button>
	);
}

export default FormInputSubfix;
