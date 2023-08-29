import "./RouteControls.scss";
import { Col, InputNumber, Row, Slider, Switch  } from "antd";

function RouteControls({formValues, setFormValues}) {
	const marks = {
		0: "Cheapest",
		4: "Expensive",
	};

	const handleChange = (value, name) => {
        const newFormValues = {...formValues};
        newFormValues[name] = value;
        setFormValues(newFormValues);
	};

	return (
		<div className="route-controls">
			<Slider
				range={{ draggableTrack: true }}
				defaultValue={[0, 4]}
				step={1}
				max={4}
				marks={marks}
				onChange={(value)=>handleChange(value, "price_range")}
                value={formValues.price_range}
                style={{
                    width: "80%",
                    margin:"1rem auto 1rem auto",
                }}
			/>
			<Row>
				<Col span={16}>
					<Slider
						min={100}
						max={5000}
						onChange={(value)=>handleChange(value, "radius")}
						value={typeof formValues.radius === "number" ? formValues.radius : 0}
					/>
				</Col>
				<Col span={6}>
					<InputNumber
						min={100}
						max={5000}
						style={{
							margin: "0 16px",
						}}
						value={`${formValues.radius}meters`}
						onChange={(value)=>handleChange(value, "radius")}
					/>
				</Col>
			</Row>
            <Row>
				<Col span={16}>
					<Slider
						min={10}
						max={480}
						onChange={(value)=>handleChange(value, "duration")}
						value={typeof formValues.duration === "number" ? formValues.duration : 0}
					/>
				</Col>
				<Col span={6}>
					<InputNumber
						min={10}
						max={480}
						style={{
							margin: "0 16px",
						}}
						value={`${formValues.duration}minute`}
						onChange={(value)=>handleChange(value, "duration")}
					/>
				</Col>
			</Row>
            <Switch checkedChildren="Include Closed" unCheckedChildren="Exclude Closed" onChange={(value)=>handleChange(value, "opennow_only")}/>
		</div>
	);
}

export default RouteControls;
