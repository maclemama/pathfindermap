import "./FormInputPrefix.scss";
import SVGIcons from "../SVGIcons/SVGIcons";
import { useRef, useEffect } from "react";

function FormInputPrefix({ text, svgName, setInputPreflixWidth }) {
	const elementRef = useRef(null);

	useEffect(() => {
		if (setInputPreflixWidth) {
			setInputPreflixWidth(elementRef.current.offsetWidth);
		}
	}, []);

	return (
		<div className="input-prefix" ref={elementRef} key={text}>
			{svgName && (
				<SVGIcons iconName={svgName} cssClassName={"input-prefix__icon"} />
			)}
			{text && <p className="input-prefix__text">{text}</p>}
		</div>
	);
}

export default FormInputPrefix;
