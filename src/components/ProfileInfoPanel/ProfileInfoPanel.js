import "./ProfileInfoPanel.scss";

import { useSelector } from "react-redux";

import { selectCurrentUser } from "../../store/user/userSelector";

function ProfileInfoPanel() {
	const user = useSelector(selectCurrentUser);

	return (
		<section className="profile-info">
			<h2 className="profile-info__greeting">
				{`Welcome Back ${user.first_name} !`}
			</h2>
		</section>
	);
}

export default ProfileInfoPanel;
