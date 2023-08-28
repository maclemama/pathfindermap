import { useEffect, useState } from "react";
import "./RouteSearchPanel.scss";

function RouteSearchPanel() {
	const maxNumberOfSearch = 10;
	const [numberOfSearch, setNumberOfSearch] = useState(1);
	const [searchQuery, setSearchQuery] = useState([]);
	const [searchInputStore, setSearchInputStore] = useState({});

	const handleSearchInputChange = (e) => {
		const { name, value } = e.target;
		console.log(name + ":" + value);
		setSearchInputStore({
			...searchInputStore,
			[name]: value,
		});
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
		console.log(e.target);
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
				<button type="submit">
					submit
				</button>
			</form>
		</section>
	);
}

export default RouteSearchPanel;