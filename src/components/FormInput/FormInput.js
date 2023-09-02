import "./FormInput.scss";

function FormInput({
	inputType,
	inputName,
	inputPlaceHolder,
	inputValue,
	inputOnChange,
	inputOnBlur,
	inputOnFocus,
	prefixComponent,
	inputPreflixWidth
}) {
	return (
		<div className="form-input__wrapper">
			{prefixComponent && prefixComponent[0]}
			<input
				type={inputType}
				name={inputName}
				className="form-input"
				placeholder={inputPlaceHolder}
				value={inputValue}
				onChange={inputOnChange}
				onFocus={inputOnFocus}
				onBlur={inputOnBlur}
				style={{"--prefix-width": `${inputPreflixWidth ? inputPreflixWidth + 10 : 12}px`}}
			/>
		</div>
	);
}

export default FormInput;
