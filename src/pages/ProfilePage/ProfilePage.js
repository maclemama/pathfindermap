import ProfileInfoPanel from "../../components/ProfileInfoPanel/ProfileInfoPanel";
import ProfileSavedRoute from "../../components/ProfileSavedRoute/ProfileSavedRoute";
import "./ProfilePage.scss";
import { useNavigate } from "react-router-dom";

function ProfilePage({ signedin, user, mapRef }) {
	const navigate = useNavigate();

	if (!signedin) {
		navigate("/");
	}

	return (
		<section className="profile">
			<div className="profile__info-panel">
				<ProfileInfoPanel user={user} />
			</div>
			<div className="profile__saved-route">
				<ProfileSavedRoute mapRef={mapRef} signedin={signedin} />
			</div>
		</section>
	);
}

export default ProfilePage;
