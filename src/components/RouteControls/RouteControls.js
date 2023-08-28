import "./RouteControls.scss";
import { Col, InputNumber, Row, Slider, Switch  } from "antd";
import { useState } from "react";

// price range maxprice, minprice 0-4
// radius
// opennow

function RouteControls({formValues, setFormValues}) {
	const [value, setValue] = useState();
    const [inputValue, setInputValue] = useState(1);
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
						value={`${formValues.radius}m`}
						onChange={(value)=>handleChange(value, "radius")}
					/>
				</Col>
			</Row>
            <Switch checkedChildren="Include Outdoor" unCheckedChildren="Exclude Outdoor" onChange={(value)=>handleChange(value, "include_indoor")} defaultChecked />
            <Switch checkedChildren="Include Indoor" unCheckedChildren="Exclude Indoor" onChange={(value)=>handleChange(value, "include_outdoor")} defaultChecked />
            <Switch checkedChildren="Include Closed" unCheckedChildren="Exclude Closed" onChange={(value)=>handleChange(value, "opennow_only")}/>
		</div>
	);
}

export default RouteControls;
