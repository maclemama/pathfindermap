import "./RouteRandomPanel.scss";
import RouteSubmitButton from "../RouteSubmitButton/RouteSubmitButton";
import RouteControls from "../RouteControls/RouteControls";
import { useState } from "react";

function RouteRandomPanel({ handleQuerySubmit, setMapRadius }) {
	const defaultFormValue = {
		query_mode: "random",
		radius: 3000,
		duration: 60,
		opennow_only: false,
		max_route: 5,
	};

    const [formValues, setFormValues] = useState(defaultFormValue);

	return (
		<section className="route-random">
			<h2 className="route-random__title">
				Press button to explore random path idea!
			</h2>
			<div className="route-random__form">
				<RouteControls
					formValues={formValues}
					setFormValues={setFormValues}
					setMapRadius={setMapRadius}
				/>
				<RouteSubmitButton
					onClickFunc={(e) => handleQuerySubmit(e, formValues, "random")}
				/>
			</div>
		</section>
	);
}

export default RouteRandomPanel;
