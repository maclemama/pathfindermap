import "./ProfileInfoPanel.scss";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import { setModal } from "../../store/modal/modalSlice";

function ProfileInfoPanel() {
	const dispatch = useDispatch();
	const token = localStorage.getItem("token");
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		if (token) {
			axios
				.get(process.env.REACT_APP_SERVER_URL + "/user", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((res) => {
					setUser(res.data);
					setIsLoading(false);
				})
				.catch((error) => {
					dispatch(
						setModal({
							title: "Error",
							message: error.response.data.message || error.message,
						})
					);
					setIsLoading(false);
				});
		}
	}, []);

	if (isLoading) {
		return;
	}

	return (
		<section className="profile-info">
			<h2 className="profile-info__greeting">
				{`Welcome Back ${user.first_name} !`}
			</h2>
		</section>
	);
}

export default ProfileInfoPanel;
