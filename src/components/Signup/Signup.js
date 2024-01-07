import "./Signup.scss";

import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import ReactGA from "react-ga4";

import { signUpUser } from "../../scripts/userUtils";

import SignupInput from "../../components/SignupInput/SignupInput";
import logo from "../../assets/logos/logo-no-background.png";

function Signup() {
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const first_name = event.target.first_name.value;
		const last_name = event.target.last_name.value;
		const email = event.target.email.value;
		const password = event.target.password.value;
		try {
			await signUpUser(first_name, last_name, email, password);
			ReactGA.event({
				category: "membership",
				action: "member-registration",
			});
			navigate("/user/verify/email_sent");
		} catch (error) {
			setError(error.response.data.message);
		}
	};

	return (
		<>
			<button className="signup__home-button">
				<Link to="/">
					<img
						src={logo}
						alt="Pathfinder brand logo"
						className="signup__logo"
					/>
				</Link>
			</button>
			<h1 className="signup__title">Let's get started.</h1>
			<form className="signup__form" onSubmit={handleSubmit}>
				<SignupInput
					inputType={"text"}
					inputName={"first_name"}
					inputPlaceHolder={"Fist name"}
					inputLabel={"First Name"}
				/>

				<SignupInput
					inputType={"text"}
					inputName={"last_name"}
					inputPlaceHolder={"Last name"}
					inputLabel={"Last Name"}
				/>

				<SignupInput
					inputType={"text"}
					inputName={"email"}
					inputPlaceHolder={"Email"}
					inputLabel={"Email"}
				/>

				<SignupInput
					inputType={"password"}
					inputName={"password"}
					inputPlaceHolder={"Password"}
					inputLabel={"Password"}
				/>

				<button className="signup__button">Sign up</button>

				{error && <div className="signup__message">{error}</div>}
			</form>

			<p>
				Have an account? <Link to="/signin">Sign in</Link>
			</p>
		</>
	);
}

export default Signup;
