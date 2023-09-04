import "./SignupVerify.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function SignupVerify({ verification_code }) {
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		axios
			.post(`${process.env.REACT_APP_SERVER_URL}/user/verify`, {
				verification_code: verification_code,
			})
			.then((response) => {
				console.log(response.data);
				setSuccess(true);
				setTimeout(() => {
					navigate("/signin");
				}, 2000);
			})
			.catch((error) => {
				console.error(error);
				setError(error.response.data.message);
			});
	}, []);
	return (
		<>
			{error && <div className="verification__error">{error}</div>}
			{success && (
				<div className="verification__success">
					Verification Complete
					<p>Redirecting to signin page...</p>
				</div>
			)}
		</>
	);
}

export default SignupVerify;
