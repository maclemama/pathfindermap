import SVGIcons from "../SVGIcons/SVGIcons";
import "./RouteSaveButton.scss";


function RouteSaveButton({ saved, onClickHandler }) {
	return (
		<>
			{!saved && (
				<button
					className="route-save-button"
					onClick={() => onClickHandler("save")}
				>
					<SVGIcons
						iconName={"heart_empty"}
						cssClassName={"route-save-button__icon"}
					/>
				</button>
			)}

			{saved && (
				<button
					className="route-save-button"
					onClick={() => onClickHandler("unsave")}
				>
					<SVGIcons
						iconName={"heart_fill"}
						cssClassName={"route-save-button__icon"}
					/>
				</button>
			)}
		</>
	);
}

export default RouteSaveButton;
