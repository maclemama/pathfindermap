import ProfileInfoPanel from "../../components/ProfileInfoPanel/ProfileInfoPanel";
import ProfileSavedRoute from "../../components/ProfileSavedRoute/ProfileSavedRoute";
import "./ProfilePage.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function ProfilePage({ signedin, mapRef }) {
	const navigate = useNavigate();
	const [modal, setModal] = useState([]);

	if (!signedin) {
		navigate("/");
	}

	return (
		<section className="profile">
			<div className="profile__info-panel">
				<ProfileInfoPanel setModal={setModal} />
			</div>
			<div className="profile__saved-route">
				<ProfileSavedRoute
					mapRef={mapRef}
					signedin={signedin}
					setModal={setModal}
				/>
			</div>

			{modal[0]}
		</section>
	);
}

export default ProfilePage;
