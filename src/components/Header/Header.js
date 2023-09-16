import "./Header.scss";
import headerLogo from "../../assets/logos/logo-no-background.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SVGIcons from "../SVGIcons/SVGIcons";
import { useContext } from "react";
import { UserContext } from "../../App";

function Header() {
	const location = useLocation();
	const navigate = useNavigate();
	const isSigninPage = location.pathname.toLowerCase().includes("signin");
	const isSignupPage = location.pathname.toLowerCase().includes("signup");
	const isProfilePage = location.pathname.toLowerCase().includes("profile");
	const { setUser, user } = useContext(UserContext);

	const handleSignout = () => {
		localStorage.removeItem("token");
		setUser(null);
		navigate("/");
	};

	return (
		<header className={`header ${isProfilePage ? "header--profile" : ""}`}>
			<button className="header__home-button">
				<Link to="/">
					<img
						src={headerLogo}
						alt="Pathfinder brand logo"
						className={`header__logo ${
							isProfilePage ? "header__logo--profile" : ""
						}`}
					/>
				</Link>
			</button>

			{isProfilePage || isSignupPage || isSigninPage || !!user || (
				<button className="header__signin-button">
					<Link to="/signin">
						<h3 className="header__signin-button-text">Sign in</h3>
					</Link>
				</button>
			)}

			{!!user && (
				<div className="header__user-control-wrapper">
					{isProfilePage || (
						<>
							<button className="header__profile">
								<Link to="/profile">
									<SVGIcons
										cssClassName={"header__profile-icon"}
										iconName={"user"}
									/>
									<h4 className="header__profile-icon-text">Profile</h4>
								</Link>
							</button>
						</>
					)}
					{isProfilePage && (
						<>
							<button
								className={`header__signin-button ${
									isProfilePage ? "header__signin-button--profile" : ""
								}`}
								onClick={handleSignout}
							>
								<h3
									className={`header__signin-button-text ${
										isProfilePage ? "header__signin-button-text--profile" : ""
									}`}
								>
									Sign out
								</h3>
							</button>
						</>
					)}
				</div>
			)}
		</header>
	);
}

export default Header;
