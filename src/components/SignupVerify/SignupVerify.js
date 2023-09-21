import "./SignupVerify.scss";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { verifyUser } from "../../scripts/userUtils";

function SignupVerify({ verification_code }) {
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const verify = async () => {
			try {
				await verifyUser(verification_code);
				setSuccess(true);
				setTimeout(() => {
					navigate("/signin");
				}, 2000);
			} catch (error) {
				setError(error.response.data.message);
			}
		};

		if (verification_code !== "email_sent") {
			verify();
		}
	}, [verification_code, navigate]);
	return (
		<>
			{error && <div className="verification__error">{error}</div>}
			{success && (
				<div className="verification__success">
					Verification Complete
					<p>Redirecting to signin page...</p>
				</div>
			)}
			{verification_code === "email_sent" && (
				<div className="verification__need-verify">
					An verification email has been sent to your register email, please
					click on the verification link in the email to verify.
				</div>
			)}
		</>
	);
}

export default SignupVerify;
