import { useEffect, useState } from "react";
import "./ProfileInfoPanel.scss";
import axios from "axios";

function ProfileInfoPanel() {
	const token = localStorage.getItem("token");
    const [user, setUser] = useState(null)
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
					
				});
		} 
	}, []);

    if(isLoading){
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
