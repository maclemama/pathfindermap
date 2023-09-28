import "./SortButton.scss";
import SVGIcons from "../SVGIcons/SVGIcons";
import MotionButton from "../MotionButton/MotionButton";

function SortButton({ onClickFunc, text, iconName, active }) {
	return (
		<MotionButton
			onClickFunc={onClickFunc}
			cssClassName={`sort-button ${active ? "sort-button--active":""}`}
			buttonContent={[
				<>
					<SVGIcons iconName={iconName} cssClassName={"sort-button__icon"} />
					<h4 className="sort-button__text">{text}</h4>
				</>,
			]}
		/>
	);
}

export default SortButton;
