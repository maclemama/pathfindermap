import "./Signin.scss";

import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { signInUser } from "../../scripts/userUtils";

import SignupInput from "../../components/SignupInput/SignupInput";
import logo from "../../assets/logos/logo-no-background.png";

function Signin() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [error, setError] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		const email = event.target.email.value;
		const password = event.target.password.value;
		try {
			const setUserAction = await signInUser(email, password);
			dispatch(setUserAction);

			navigate("/profile");
		} catch (error) {
			setError(error?.response?.data.message);
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

				<button className="signup__button">Sign in</button>

				{error && <div className="signup__message">{error}</div>}
			</form>

			<p>
				Need an account? <Link to="/signup">Sign up</Link>
			</p>
		</>
	);
}

export default Signin;
