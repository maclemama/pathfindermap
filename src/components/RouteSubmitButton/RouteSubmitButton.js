import "./RouteSubmitButton.scss";
import MontionButton from "../MotionButton/MotionButton";

function RouteSubmitButton({ onClickFunc }) {
	return (
		<MontionButton
			onClickFunc={onClickFunc}
			cssClassName={"route-submit-button"}
			buttonType={"submit"}
			buttonContent={["Find Path"]}
		/>
	);
}

export default RouteSubmitButton;
