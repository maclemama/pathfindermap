import "./SignupInput.scss";

function SignupInput({
	inputType,
	inputName,
	inputPlaceHolder,
	inputValue,
	inputOnChange,
	inputOnBlur,
	inputOnFocus,
	inputLabel,
}) {
	return (
		<div className="signup-input__wrapper">
			<label className="signup-input__label" htmlFor={inputName}>
                {inputLabel}
			</label>
            <input
					type={inputType}
					name={inputName}
					className="signup-input"
					placeholder={inputPlaceHolder}
					value={inputValue}
					onChange={inputOnChange}
					onFocus={inputOnFocus}
					onBlur={inputOnBlur}
				/>
		</div>
	);
}

export default SignupInput;
