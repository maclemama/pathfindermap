import "./ProfileMenu.scss";

import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { selectCurrentUser } from "../../store/user/userSelector";
import { signOutUser } from "../../scripts/userUtils";

import logo from "../../assets/logos/logo-no-background.png";
import MotionButton from "../MotionButton/MotionButton";

function ProfileMenu({ tab, handleSetTab }) {
	const user = useSelector(selectCurrentUser);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleSignOut = () => {
		const setUserAction = signOutUser();
		dispatch(setUserAction);
		navigate("/");
	};

	return (
		user && (
			<section className="profile-menu">
				<Link to="/">
					<img
						src={logo}
						alt="Pathfinder brand logo"
						className="profile-menu__logo"
					/>
				</Link>
				<h2 className="profile-menu__greeting">
					{`Welcome Back ${user.first_name} !`}
				</h2>

				<nav className="profile-nav">
					<ul className="profile-nav__list">
						<li
							className={`profile-nav__item ${
								tab === "saved_route" ? "profile-nav__item--active" : ""
							}`}
							onClick={() => handleSetTab("saved_route")}
						>
							<MotionButton
								onClickFunc={() => handleSetTab("saved_route")}
								cssClassName={`profile-nav__tab-button ${
									tab === "saved_route" ? "profile-nav__tab-button--active" : ""
								}`}
								buttonContent={[
									<>
										<div className="profile-nav__tab-emoji">📌</div>
										<div className="profile-nav__tab-text">Saved Paths</div>
									</>,
								]}
							/>
						</li>

						<li
							className={`profile-nav__item ${
								tab === "account_config" ? "profile-nav__item--active" : ""
							}`}
							onClick={() => handleSetTab("account_config")}
						>
							<MotionButton
								onClickFunc={() => handleSetTab("account_config")}
								cssClassName={`profile-nav__tab-button ${
									tab === "account_config"
										? "profile-nav__tab-button--active"
										: ""
								}`}
								buttonContent={[
									<>
										<div className="profile-nav__tab-emoji">⚙️</div>
										<div className="profile-nav__tab-text">Account Setting</div>
									</>,
								]}
							/>
						</li>
					</ul>
				</nav>
				<button
					className="profile-menu__signout-button"
					onClick={handleSignOut}
				>
					<h3
						className="profile-menu__signout-button-text"
					>
						Sign out
					</h3>
				</button>
			</section>
		)
	);
}

export default ProfileMenu;
