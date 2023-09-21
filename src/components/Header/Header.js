import "./Header.scss";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { selectCurrentUser } from "../../store/user/userSelector";
import { signOutUser } from "../../scripts/userUtils";

import headerLogo from "../../assets/logos/logo-no-background.png";
import SVGIcons from "../SVGIcons/SVGIcons";

function Header() {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector(selectCurrentUser);

	const isSigninPage = location.pathname.toLowerCase().includes("signin");
	const isSignupPage = location.pathname.toLowerCase().includes("signup");
	const isProfilePage = location.pathname.toLowerCase().includes("profile");

	const handleSignOut = () => {
		const setUserAction = signOutUser();
		dispatch(setUserAction);
		navigate("/");
	};

	return (
		<header className={`header ${isProfilePage ? "header--profile" : ""}`}>
			<Link to="/">
				<img
					src={headerLogo}
					alt="Pathfinder brand logo"
					className={`header__logo ${
						isProfilePage ? "header__logo--profile" : ""
					}`}
				/>
			</Link>

			{isProfilePage || isSignupPage || isSigninPage || !!user || (
				<Link className="header__signin-button" to="/signin">
					<h3 className="header__signin-button-text">Sign in</h3>
				</Link>
			)}

			{!!user && (
				<div className="header__user-control-wrapper">
					{isProfilePage || (
						<Link className="header__profile" to="/profile">
							<SVGIcons
								cssClassName={"header__profile-icon"}
								iconName={"user"}
							/>
							<h4 className="header__profile-icon-text">Profile</h4>
						</Link>
					)}
					{isProfilePage && (
						<button
							className={`header__signin-button ${
								isProfilePage ? "header__signin-button--profile" : ""
							}`}
							onClick={handleSignOut}
						>
							<h3
								className={`header__signin-button-text ${
									isProfilePage ? "header__signin-button-text--profile" : ""
								}`}
							>
								Sign out
							</h3>
						</button>
					)}
				</div>
			)}
		</header>
	);
}

export default Header;
