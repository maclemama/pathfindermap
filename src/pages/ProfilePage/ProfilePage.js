import ProfileInfoPanel from "../../components/ProfileInfoPanel/ProfileInfoPanel";
import ProfileSavedRoute from "../../components/ProfileSavedRoute/ProfileSavedRoute";
import "./ProfilePage.scss";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../../App";

function ProfilePage({ mapRef }) {
	const navigate = useNavigate();
	const [modal, setModal] = useState([]);
	const { user } = useContext(UserContext);

	if (!user) {
		navigate("/");
	}

	return (
		<section className="profile">
			<div className="profile__info-panel">
				<ProfileInfoPanel setModal={setModal} />
			</div>
			<div className="profile__saved-route">
				<ProfileSavedRoute mapRef={mapRef} user={user} setModal={setModal} />
			</div>

			{modal[0]}
		</section>
	);
}

export default ProfilePage;
