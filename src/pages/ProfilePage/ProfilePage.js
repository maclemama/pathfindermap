import "./ProfilePage.scss";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectCurrentUser } from "../../store/user/userSelector";

import ProfileInfoPanel from "../../components/ProfileInfoPanel/ProfileInfoPanel";
import ProfileSavedRoute from "../../components/ProfileSavedRoute/ProfileSavedRoute";

function ProfilePage({ mapRef }) {
	const navigate = useNavigate();
	const user = useSelector(selectCurrentUser);

	if (!user) {
		navigate("/");
	}

	return (
		<section className="profile">
			<div className="profile__info-panel">
				<ProfileInfoPanel />
			</div>
			<div className="profile__saved-route">
				<ProfileSavedRoute mapRef={mapRef} user={user} />
			</div>
		</section>
	);
}

export default ProfilePage;
