import "./Signin.scss";
import SignupInput from "../../components/SignupInput/SignupInput";
import logo from "../../assets/logos/logo-no-background.png";
import { useNavigate, Link } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../../App";
import axios from "axios";

function Signin() {
	const { setUser } = useContext(UserContext);
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
				const token = response.data.token;
				localStorage.setItem("token", token);

				axios
					.get(process.env.REACT_APP_SERVER_URL + "/user", {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					})
					.then((res) => {
						setUser(res.data);
					})
					.catch((error) => {
						localStorage.removeItem("token");
						setUser(null);
					});

				navigate("/profile");
			})
			.catch((error) => {
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
