import usePlacesAutocomplete from "use-places-autocomplete";
import { getGoogleGeocoder } from "../../scripts/locationUtilis";
import { AutoComplete, Input } from "antd";
import { useEffect, useState } from "react";
import "./ControlStartingPoint.scss";

function ControlStartingPoint({ startingPoint, setStartingPoint }) {
	const {
		ready,
		value,
		suggestions: { status, data },
		setValue,
		clearSuggestions,
	} = usePlacesAutocomplete();

	const [searchOptions, setSearchOptions] = useState([]);

	const onSearchChange = (val) => {
		setValue(val);
	};

	const onSearchSelect = (val, option) => {
		setValue(val, false);
		clearSuggestions();
		console.log(option);

		getGoogleGeocoder({ placeId: val })
			.then((matchedPlace) => {
				setStartingPoint({
					lat: matchedPlace.geometry.location.lat(),
					lng: matchedPlace.geometry.location.lng(),
					placeId: matchedPlace.place_id,
					address: matchedPlace.formatted_address,
				});
			})
			.catch((e) => console.log("Geocoder failed due to: " + e));
	};

	const renderSearchOption = (place) => ({
		value: place.place_id,
		label: <div className="">{place.description}</div>,
	});

	useEffect(() => {
		if (status === "OK" && data[0]) {
			const placess = data.map((place) => renderSearchOption(place));
			const newSuggtions = [
				{
					label: <h4>Address Suggestions</h4>,
					options: placess,
				},
			];
			setSearchOptions(newSuggtions);
		}
	}, [status, data]);

	return (
		<section className="starting-point">
			<AutoComplete
				value={value}
				options={searchOptions}
				style={{
					width: "100%",
				}}
				onSelect={onSearchSelect}
				onChange={onSearchChange}
				defaultValue={"hahahahah"}
			>
				<Input.Search
					size="large"
					style={{
						width: "100%",
						height: "3rem",
					}}
				/>
			</AutoComplete>
		</section>
	);
}

export default ControlStartingPoint;
