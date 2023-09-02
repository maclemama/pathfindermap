import "./RouteMoodPanel.scss";

import { useEffect, useState } from "react";
import RouteControls from "../RouteControls/RouteControls";
import FormInput from "../FormInput/FormInput";
import SVGIcons from "../SVGIcons/SVGIcons";
import FormInputPrefix from "../FormInputPrefix/FormInputPrefix";
import RouteSubmitButton from "../RouteSubmitButton/RouteSubmitButton";

function RouteMoodPanel({ handleQuerySubmit, setMapRadius, allFormReset }) {
	const defaultFormValue = {
		query_mode: "mood",
		query_mood: "",
		radius: 3000,
		duration: 60,
		opennow_only: false,
		max_route: 5,
	};

	const [formValues, setFormValues] = useState(defaultFormValue);

	const handleSearchInputChange = (e) => {
		const { name, value } = e.target;
		const newFormValus = { ...formValues };
		newFormValus.query_mood = value;
		setFormValues(newFormValus);
	};

    const inputPrefix = [
        <FormInputPrefix text={"Mood"} />,
    ]

	useEffect(()=>{
		if(allFormReset > 0){
			setFormValues(defaultFormValue);
		}
	},[allFormReset])

	return (
		<section className="route-search">
			<h2 className="route-search__title">
				Search or select mood you want in the journey
			</h2>
			<div className="route-search__form">
				<div className="route-search__stop">
					<SVGIcons
						iconName={"down"}
						cssClassName={"route-search__next-stop-icon"}
					/>
					<div className="route-search__input-wrapper">
						<FormInput
							inputType={"text"}
							inputName={`route-mood__input`}
							inputOnChange={(e) =>
								handleSearchInputChange(e)
							}
							inputValue={formValues.query_mood}
							prefixComponent={inputPrefix}
							inputPreflixWidth={65}
							inputPlaceHolder={"Enter the mood you want..."}
						/>
					</div>
				</div>
				<RouteControls
					formValues={formValues}
					setFormValues={setFormValues}
					setMapRadius={setMapRadius}
				/>
				<RouteSubmitButton
					onClickFunc={(e) => handleQuerySubmit(e, formValues, "mood")}
				/>
			</div>
		</section>
	);
}

export default RouteMoodPanel;
