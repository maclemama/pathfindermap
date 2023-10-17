import "./RouteSubmitButton.scss";
import MontionButton from "../MotionButton/MotionButton";

function RouteSubmitButton({ onClickFunc, disabled }) {
	return (
		<MontionButton
			onClickFunc={onClickFunc}
			cssClassName={`route-submit-button ${disabled ? "route-submit-button--disabled" : ""}`}
			buttonType={"submit"}
			buttonContent={["Find Path"]}
			disabled={disabled}
		/>
	);
}

export default RouteSubmitButton;
