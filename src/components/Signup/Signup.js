import "./Signup.scss";
import SignupInput from "../../components/SignupInput/SignupInput";
import logo from "../../assets/logos/logo-no-background.png";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Signup() {
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();

		axios
			.post(`${process.env.REACT_APP_SERVER_URL}/user/register`, {
				first_name: event.target.first_name.value,
				last_name: event.target.last_name.value,
				email: event.target.email.value,
				password: event.target.password.value,
			})
			.then((response) => {
				navigate("/signin");
			})
			.catch((error) => {
				console.error(error);
				setError(error.response.data.message);
			});
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
