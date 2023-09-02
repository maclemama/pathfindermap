import usePlacesAutocomplete from "use-places-autocomplete";
import { getGoogleGeocoder } from "../../scripts/locationUtilis";
import { useEffect, useState } from "react";
import "./ControlStartingPoint.scss";
import FormAutoComplete from "../FormAutoComplete/FormAutoComplete";
import FormInputPrefix from "../FormInputPrefix/FormInputPrefix";

function ControlStartingPoint({
	setStartingPoint,
	setIsCurrentLoaction,
	setCurrentLocationAsStart,
}) {
	const {
		suggestions: { status, data },
		setValue,
		clearSuggestions,
	} = usePlacesAutocomplete();
	const [autoCompleteOptions, setAutoCompleteOptions] = useState([]);
	const [inputValue, setInputValue] = useState(
		"Using Current Location (Tap tp search)"
	);
	const [inputPreflixWidth, setInputPreflixWidth] = useState(0);

	const onSearchChange = (val) => {
		setValue(val.target.value);
		setInputValue(val.target.value);
	};

	const inputOnFocus = () => {
		setAutoCompleteOptions([
			<div
				onClick={() => {
					setCurrentLocationAsStart();
					setAutoCompleteOptions([]);
					setInputValue("Using Current Location");
				}}
			>
				<p>Use current location</p>
			</div>,
		]);
		setInputValue("");
	};

	const onSearchSelect = (val) => {
		console.log("asdasd");
		setValue(val, false);
		clearSuggestions();
		setAutoCompleteOptions([]);
		if (val) {
			getGoogleGeocoder({ placeId: val })
				.then((matchedPlace) => {
					console.log(matchedPlace);
					setInputValue(matchedPlace.formatted_address);
					setStartingPoint({
						lat: matchedPlace.geometry.location.lat(),
						lng: matchedPlace.geometry.location.lng(),
						placeId: matchedPlace.place_id,
						address: matchedPlace.formatted_address,
					});
					setIsCurrentLoaction(false);
				})
				.catch((e) => console.log("Geocoder failed due to: " + e));
		}
	};

	useEffect(() => {
		if (status === "OK" && data[0]) {
			let dropdownOptionComponents = data.map((place, index) => {
				return (
					<div key={index} onClick={() => onSearchSelect(place.place_id)}>
						<p>{place.description}</p>
					</div>
				);
			});
			dropdownOptionComponents.unshift(
				<div
					key={"home"}
					onClick={() => {
						setCurrentLocationAsStart();
						setAutoCompleteOptions([]);
						setInputValue("Using Current Location");
					}}
				>
					<p>Use current location</p>
				</div>
			);
			setAutoCompleteOptions(dropdownOptionComponents);
		}
	}, [status, data]);

	return (
		<section className="starting-point">
			<FormAutoComplete
				dropdownListComponent={autoCompleteOptions}
				inputPlaceHolder={"Search Address"}
				inputOnChange={onSearchChange}
				inputOnFocus={inputOnFocus}
				inputValue={inputValue}
				inputPreflixWidth={inputPreflixWidth}
				prefixComponent={[
					<FormInputPrefix
						text={"Start"}
						svgName={"home_pin"}
						setInputPreflixWidth={setInputPreflixWidth}
					/>,
				]}
			/>
		</section>
	);
}

export default ControlStartingPoint;
