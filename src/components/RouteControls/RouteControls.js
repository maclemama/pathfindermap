import "./RouteControls.scss";
import { Col, InputNumber, Row, Slider, Switch } from "antd";

function RouteControls({ formValues, setFormValues, setMapRadius }) {
	const handleChange = (value, name) => {
		const newFormValues = { ...formValues };
		newFormValues[name] = value;
		setFormValues(newFormValues);
		console.log(name);
		if (name === "radius") {
			setMapRadius(value);
		}
	};

	return (
		<div className="route-controls">
			<div className="route-controls__input-group-wrapper">
				<label className="route-controls__input-label">Radius</label>
				<div className="route-controls__input-wrapper">
					<div className="route-controls__input-middle-wrapper">
						<Slider
							min={100}
							max={5000}
							onChange={(value) => handleChange(value, "radius")}
							value={
								typeof formValues.radius === "number" ? formValues.radius : 0
							}
						/>
					</div>
					<div className="route-controls__input-right-wrapper">
						<InputNumber
							min={100}
							max={5000}
							value={`${formValues.radius} m`}
							onChange={(value) => handleChange(value, "radius")}
						/>
					</div>
				</div>
			</div>
			<div className="route-controls__input-group-wrapper">
				<label className="route-controls__input-label">Commute Time</label>
				<div className="route-controls__input-wrapper">
					<div className="route-controls__input-middle-wrapper">
						<Slider
							min={10}
							max={480}
							onChange={(value) => handleChange(value, "duration")}
							value={
								typeof formValues.duration === "number"
									? formValues.duration
									: 0
							}
						/>
					</div>
					<div className="route-controls__input-right-wrapper">
						<InputNumber
							min={10}
							max={480}
							value={`${formValues.duration} min`}
							onChange={(value) => handleChange(value, "duration")}
						/>
					</div>
				</div>
			</div>
			<div className="route-controls__input-group-wrapper">
				<label className="route-controls__input-label">No of Routes</label>
				<div className="route-controls__input-wrapper">
					<div className="route-controls__input-middle-wrapper">
						<Slider
							min={1}
							max={10}
							onChange={(value) => handleChange(value, "max_route")}
							value={
								typeof formValues.max_route === "number"
									? formValues.max_route
									: 0
							}
						/>
					</div>
					<div className="route-controls__input-right-wrapper">
						<InputNumber
							min={1}
							max={10}
							value={`${formValues.max_route} route`}
							onChange={(value) => handleChange(value, "max_route")}
						/>
					</div>
				</div>
			</div>
			<div className="route-controls__input-group-wrapper route-controls__input-group-wrapper--opennow">
				<label className="route-controls__input-label">Only Places Open Now</label>
				<Switch
					checkedChildren="Include Closed"
					unCheckedChildren="Exclude Closed"
					onChange={(value) => handleChange(value, "opennow_only")}
				/>
			</div>
		</div>
	);
}

export default RouteControls;
