import { useEffect, useState } from "react";
import "./RouteSearchPanel.scss";
import RouteControls from "../RouteControls/RouteControls";
import FormInput from "../FormInput/FormInput";
import SVGIcons from "../SVGIcons/SVGIcons";
import FormInputPrefix from "../FormInputPrefix/FormInputPrefix";
import FormInputSubfix from "../FormInputSubfix/FormInputSubfix";
import RouteSubmitButton from "../RouteSubmitButton/RouteSubmitButton";

function RouteSearchPanel({ handleQuerySubmit, setMapRadius }) {
	const maxNumberOfSearch = 10;
	const [numberOfSearch, setNumberOfSearch] = useState(1);
	const [searchQuery, setSearchQuery] = useState([]);
	const defaultFormValue = {
		query_mode: "keyword",
		query_keyword: {},
		radius: 3000,
		duration: 60,
		opennow_only: false,
		max_route: 5,
	};
	const [formValues, setFormValues] = useState(defaultFormValue);

	const [stopNumbers, setStepNumbers] = useState([]);

	const handleSearchInputChange = (e) => {
		const { name, value } = e.target;
		const newFormValus = { ...formValues };
		newFormValus.query_keyword[name] = value;
		setFormValues(newFormValus);
	};

	// const handleInputClose = (searchInputNumber) => {
	// 	let newSearchQuery = [...searchQuery];
	// 	console.log(searchInputNumber)
	// 	newSearchQuery.splice(searchInputNumber-1,1)
	// 	setSearchQuery(newSearchQuery)
	// };

	const createSearch = (searchInputNumber) => {
		const inputPrefix = [
			<FormInputPrefix text={`Stop ${searchInputNumber}`} />,
		];
		return (
			<div className="route-search__stop" key={searchInputNumber}>
				<SVGIcons
					iconName={"down"}
					cssClassName={"route-search__next-stop-icon"}
				/>
				<div className="route-search__input-wrapper" key={searchInputNumber}>
					<FormInput
						inputType={"text"}
						inputName={`route-search__input-${searchInputNumber}`}
						inputOnChange={(e) => handleSearchInputChange(e, searchInputNumber)}
						prefixComponent={inputPrefix}
						inputPreflixWidth={65}
						inputPlaceHolder={"Places you want to go or things to do..."}
						// subfixComponent={[
						// 	<FormInputSubfix
						// 		svgName={"cancel"}
						// 		onClickfunc={() => handleInputClose(searchInputNumber)}
						// 	/>,
						// ]}
					/>
				</div>
			</div>
		);
	};

	const addNewSearch = () => {
		const newSearch = [...searchQuery, createSearch(numberOfSearch)];
		setSearchQuery(newSearch);
		setNumberOfSearch(numberOfSearch + 1);
	};

	useEffect(() => {
		setSearchQuery([createSearch(numberOfSearch)]);
		setNumberOfSearch(numberOfSearch + 1);
	}, []);

	return (
		<section className="route-search">
			<h2 className="route-search__title">
				Search for places you want to go in sequence.
			</h2>
			<div className="route-search__form">
				<div className="route-search__stop-wrapper">
					{searchQuery && searchQuery[0] && searchQuery.map((query) => query)}
				</div>
				<button
					className="route-search__button"
					onClick={addNewSearch}
					disabled={maxNumberOfSearch < numberOfSearch}
				>
					Add New Stop
				</button>
				<RouteControls
					formValues={formValues}
					setFormValues={setFormValues}
					setMapRadius={setMapRadius}
				/>
				<RouteSubmitButton
					onClickFunc={(e) => handleQuerySubmit(e, formValues, "keyword")}
				/>
			</div>
		</section>
	);
}

export default RouteSearchPanel;
