import { useEffect, useState } from "react";
import "./RouteSearchPanel.scss";
import RouteControls from "../RouteControls/RouteControls";
import FormInput from "../FormInput/FormInput";
import SVGIcons from "../SVGIcons/SVGIcons";
import FormInputPrefix from "../FormInputPrefix/FormInputPrefix";
import FormInputSubfix from "../FormInputSubfix/FormInputSubfix";
import RouteSubmitButton from "../RouteSubmitButton/RouteSubmitButton";

function RouteSearchPanel({ handleQuerySubmit, allFormReset, isLoading }) {
	const defaultFormValue = {
		query_mode: "keyword",
		query_keyword: [""],
		radius: 3000,
		duration: 60,
		opennow_only: false,
		max_route: 5,
	};
	const [formValues, setFormValues] = useState(defaultFormValue);
	const [disableSubmit, setDisableSubmit] = useState(true);
	const maxNumberOfSearch = 4;
	const numberOfSearch = formValues.query_keyword.length;

	const filledValue = (queryAry) => {
		return queryAry.some((query) => query != "");
	};

	const handleSearchInputChange = (e, index) => {
		const { value } = e.target;
		const newFormValues = { ...formValues };
		newFormValues.query_keyword[index] = value;
		setFormValues(newFormValues);
		const filledValues = filledValue(newFormValues.query_keyword);
		if (!isLoading && disableSubmit && filledValues) setDisableSubmit(false);
		if (!filledValues) setDisableSubmit(true);
	};

	const handleCloseSearchInput = (index) => {
		if (formValues.query_keyword.length > 1) {
			let newFormValues = { ...formValues };
			newFormValues.query_keyword.splice(index, 1);
			setFormValues(newFormValues);

			if (!filledValue(newFormValues.query_keyword)) setDisableSubmit(true);
		}
	};

	const addNewSearch = () => {
		let newFormValues = { ...formValues };
		newFormValues.query_keyword.push("");
		setFormValues(newFormValues);
	};

	useEffect(() => {
		if (allFormReset > 0) setFormValues(defaultFormValue);
		if (isLoading) setDisableSubmit(true);
	}, [allFormReset, isLoading]);

	return (
		<section className="route-search">
			<h2 className="route-search__title">
				Search for places you want to go in sequence.
			</h2>
			<div className="route-search__form">
				<div className="route-search__stop-wrapper">
					{formValues.query_keyword &&
						formValues.query_keyword.map((query, index) => {
							const inputPrefix = [
								<FormInputPrefix text={`Stop ${index + 1}`} />,
							];
							const inputSubfix = [
								<FormInputSubfix
									svgName={"cancel"}
									onClickfunc={() => handleCloseSearchInput(index)}
								/>,
							];
							return (
								<div className="route-search__stop" key={index}>
									<SVGIcons
										iconName={"down"}
										cssClassName={"route-search__next-stop-icon"}
									/>
									<div className="route-search__input-wrapper">
										<FormInput
											inputType={"text"}
											inputName={`route-search__input-${index}`}
											inputValue={formValues.query_keyword[index]}
											inputOnChange={(e) => handleSearchInputChange(e, index)}
											prefixComponent={inputPrefix}
											subfixComponent={
												formValues.query_keyword.length > 1 || index !== 0
													? inputSubfix
													: []
											}
											inputPreflixWidth={65}
											inputPlaceHolder={
												"Places you want to go or things to do..."
											}
										/>
									</div>
								</div>
							);
						})}
				</div>
				<button
					className="route-search__button"
					onClick={addNewSearch}
					disabled={maxNumberOfSearch < numberOfSearch}
				>
					Add New Stop
				</button>
				<RouteControls formValues={formValues} setFormValues={setFormValues} />
				<RouteSubmitButton
					onClickFunc={(e) => handleQuerySubmit(e, formValues, "keyword")}
					disabled={disableSubmit}
				/>
			</div>
		</section>
	);
}

export default RouteSearchPanel;
