import "./Signin.scss";
import SignupInput from "../../components/SignupInput/SignupInput";
import logo from "../../assets/logos/logo-no-background.png";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Signin() {
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();

		axios
			.post(`${process.env.REACT_APP_SERVER_URL}/user/login`, {
				email: event.target.email.value,
				password: event.target.password.value,
			})
			.then((response) => {
				console.log(response.data.token);
				localStorage.setItem("token", response.data.token);
				navigate("/profile");
			})
			.catch((error) => {
				console.error(error);
				event.target.email.value = "";
				event.target.password.value = "";
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
