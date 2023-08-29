import { useEffect, useState } from "react";
import "./RouteSearchPanel.scss";
import RouteControls from "../RouteControls/RouteControls";
import axios from "axios";

function RouteSearchPanel({ handleQuerySubmit, setMapRadius }) {
	const maxNumberOfSearch = 10;
	const [numberOfSearch, setNumberOfSearch] = useState(1);
	const [searchQuery, setSearchQuery] = useState([]);
	const defaultFormValue = {
		query_keyword: {},
		radius: 3000,
		duration: 60,
		opennow_only: false,
	};
	const [formValues, setFormValues] = useState(defaultFormValue);

	const handleSearchInputChange = (e) => {
		const { name, value } = e.target;
		const newFormValus = { ...formValues };
		newFormValus.query_keyword[name] = value;
		setFormValues(newFormValus);
	};

	const createSearch = (number) => {
		return (
			<div>
				<p className="route-search__text-prefix">Stop {number}: </p>
				<input
					type="text"
					name={`route-search__input-${number}`}
					onChange={(e) => handleSearchInputChange(e, number)}
				/>
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
				{searchQuery && searchQuery[0] && searchQuery.map((query) => query)}
				<button
					onClick={addNewSearch}
					disabled={maxNumberOfSearch < numberOfSearch}
				>
					add
				</button>
				<RouteControls
					formValues={formValues}
					setFormValues={setFormValues}
					setMapRadius={setMapRadius}
				/>
				<button
					type="submit"
					onClick={(e) => handleQuerySubmit(e, formValues, "keyword")}
				>
					submit
				</button>
			</div>
		</section>
	);
}

export default RouteSearchPanel;
