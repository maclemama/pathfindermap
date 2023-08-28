import { useEffect, useState } from "react";
import "./RouteSearchPanel.scss";
import RouteControls from "../RouteControls/RouteControls";

function RouteSearchPanel() {
	const maxNumberOfSearch = 10;
	const [numberOfSearch, setNumberOfSearch] = useState(1);
	const [searchQuery, setSearchQuery] = useState([]);
    const defaultFormValue = {
        searchText:{},
        radius:1500,
        price_range:[0,4],
        include_indoor: true,
        include_outdoor: true,
        opennow_only:false
    }
    const [formValues, setFormValues] = useState(defaultFormValue)

	const handleSearchInputChange = (e) => {
		const { name, value } = e.target;
        const newFormValus = {...formValues};
        newFormValus.searchText[name] = value;
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

	const handleSearchSubmit = (e) => {
        e.preventDefault();
		console.log(formValues);
	};

	return (
		<section className="route-search">
			<h2 className="route-search__title">
				Search for places you want to go in sequence.
			</h2>
			<form className="route-search__form" onSubmit={handleSearchSubmit}>
				{searchQuery && searchQuery[0] && searchQuery.map((query) => query)}
				<button
					onClick={addNewSearch}
					disabled={maxNumberOfSearch < numberOfSearch}
				>
					add
				</button>
                <RouteControls formValues={formValues} setFormValues={setFormValues}/>
				<button type="submit">
					submit
				</button>
			</form>
		</section>
	);
}

export default RouteSearchPanel;