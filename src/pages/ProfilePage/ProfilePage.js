import "./ProfilePage.scss";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

import { selectCurrentUser } from "../../store/user/userSelector";

import ProfileMenu from "../../components/ProfileMenu/ProfileMenu";
import ProfileSavedRoute from "../../components/ProfileSavedRoute/ProfileSavedRoute";

function ProfilePage() {
	const navigate = useNavigate();
	const user = useSelector(selectCurrentUser);
	const [tab, setTab] = useState("saved_route");

	if (!user) {
		navigate("/");
	}

	const handleSetTab = (tabName) => {
		setTab(tabName);
	};

	return (
		<section className="profile">
			<div className="profile__menu">
				<ProfileMenu handleSetTab={handleSetTab} tab={tab} />
			</div>
			<div className="profile__content">
				{tab === "saved_route" && (
					<>
						<div className="profile__content-top-wrapper">
							<h2 className="saved-route__title">📌 Saved Paths</h2>
						</div>
						<div className="profile__content-bottom-wrapper">
							<ProfileSavedRoute/>
						</div>
					</>
				)}

				{tab === "account_config" && (
					<>
						<div className="profile__content-top-wrapper">
							<h2 className="saved-route__title">⚙️ Account Setting</h2>
						</div>
						<div className="profile__content-bottom-wrapper">
							setting
						</div>
					</>
				)}
			</div>
		</section>
	);
}

export default ProfilePage;
