import FormInput from "../FormInput/FormInput";
import "./FormAutoComplete.scss";
import { motion } from "framer-motion";
import { useState } from "react";

function FormAutoComplete({
	dropdownListComponent,
	inputPlaceHolder,
	inputOnChange,
	inputOnFocus,
	inputValue,
	prefixComponent,
	inputPreflixWidth,
	subfixComponent
}) {
	const [isInputFocus, setisInputFocus] = useState(false);
	const inputOnBlur = () => {
		setTimeout(() => setisInputFocus(false), 2000);
	};
	const handleInputOnFocus = () => {
		setisInputFocus(true);
		inputOnFocus();
	};
	return (
		<div className="form-autocomplete">
			<FormInput
				type={"text"}
				inputName={"autocomplete-inpute"}
				inputPlaceHolder={inputPlaceHolder}
				inputOnChange={inputOnChange}
				inputOnBlur={inputOnBlur}
				inputOnFocus={handleInputOnFocus}
				inputValue={inputValue}
				prefixComponent={prefixComponent}
				inputPreflixWidth={inputPreflixWidth}
				subfixComponent={subfixComponent}
			/>
			{dropdownListComponent && dropdownListComponent[0] && (
				<div
					className={`form-autocomplete__dropdown ${
						isInputFocus ? "form-autocomplete__dropdown--active" : ""
					}`}
				>
					<motion.ul
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
					>
						<motion.ul
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5, delay: 0.1 }}
						>
							{dropdownListComponent.map((el, index) => {
								return (
									<div className="form-autocomplete__item-wrapper" key={index}>
										{el}
									</div>
								);
							})}
						</motion.ul>
					</motion.ul>
				</div>
			)}
		</div>
	);
}

export default FormAutoComplete;
