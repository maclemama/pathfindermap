import "./ControlMenu.scss";

import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import { setShowRouteControlMenu } from "../../store/layout/layoutSlice";
import { setShowRouteDetailsPanel } from "../../store/layout/layoutSlice";
import { selectShowRouteControlMenu } from "../../store/layout/layoutSelector";
import { selectShowRouteDetailsPanel } from "../../store/layout/layoutSelector";
import { selectSelectedRoute } from "../../store/route/routeSelector";

import ControlMenuGroup from "../ControlMenuGroup/ControlMenuGroup";
import SVGIcons from "../SVGIcons/SVGIcons";
import FormInput from "../FormInput/FormInput";
import FormInputPrefix from "../FormInputPrefix/FormInputPrefix";

function ControlMenu({ setCurrentLocationAsStart, isLoaded }) {
	const dispatch = useDispatch();
	const controlMenuExpanded = useSelector(selectShowRouteControlMenu);
	const routeDetailsPanelExpanded = useSelector(selectShowRouteDetailsPanel);
	const hasSelectedRoute = useSelector(selectSelectedRoute);

	const toggleShowHide = () => {
		dispatch(setShowRouteControlMenu(!controlMenuExpanded));
		if (!controlMenuExpanded) {
			dispatch(setShowRouteDetailsPanel(false));
		}
	};

	return (
		<section
			className={`control-menu ${
				!controlMenuExpanded ? "control-menu--collapsed" : ""
			} ${routeDetailsPanelExpanded || (!routeDetailsPanelExpanded && hasSelectedRoute && !controlMenuExpanded)? "control-menu--hidden":""}`}
		>
			<div className="control-menu__toggle-wrapper" onClick={toggleShowHide}>
				<motion.button
					whileHover={{
						scale: 1.05,
						transition: { duration: 0.1 },
					}}
					whileTap={{ scale: 0.95 }}
					className="control-menu__toggle-button"
				>
					<div
						className={`control-menu__toggle ${
							!controlMenuExpanded ? "" : "control-menu__toggle--active"
						} `}
					>
						<SVGIcons iconName="collapse" cssClassName="control-menu__icon" />
					</div>
					<div
						className={`control-menu__toggle ${
							controlMenuExpanded ? "" : "control-menu__toggle--active"
						} `}
					>
						<FormInput
							inputType={"text"}
							inputPlaceHolder={"Tap to search"}
							inputPreflixWidth={40}
							prefixComponent={[<FormInputPrefix svgName={"search"} />]}
						/>
					</div>
				</motion.button>
			</div>
			<div className="control-menu__wrapper">
				<ControlMenuGroup
					setCurrentLocationAsStart={setCurrentLocationAsStart}
					isLoaded={isLoaded}
					toggleShowHide={toggleShowHide}
				/>
			</div>
		</section>
	);
}

export default ControlMenu;
