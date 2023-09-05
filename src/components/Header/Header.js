import "./Header.scss";
import headerLogo from "../../assets/logos/logo-no-background.png";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import SVGIcons from "../SVGIcons/SVGIcons";
import { useNavigate } from "react-router-dom";

function Header({
	checkedSignin,
	setCheckedSignin,
	setUser,
	signedin,
	setSignedin,
}) {
	const location = useLocation();
	const navigate = useNavigate();
	const isSigninPage = location.pathname.toLowerCase().includes("signin");
	const isSignupPage = location.pathname.toLowerCase().includes("signup");
	const isProfilePage = location.pathname.toLowerCase().includes("profile");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		(() => {
			const token = localStorage.getItem("token");
			if (token) {
				axios
					.get(process.env.REACT_APP_SERVER_URL + "/user", {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					})
					.then((res) => {
						setUser(res.data);
						setSignedin(true);
						setIsLoading(false);
					})
					.catch((error) => {
						setSignedin(false);
						localStorage.removeItem("token");
						setUser(null);
						setIsLoading(false);
					});
			} else {
				setSignedin(false);
				setIsLoading(false);
			}
			setCheckedSignin(true);
		})();
	}, []);

	const handleSignout = () => {
		localStorage.removeItem("token");
		setSignedin(false);
		setUser(null);
		navigate("/");
	};

	if (isLoading) {
		return;
	}

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

			{isProfilePage || isSignupPage || isSigninPage || signedin || (
				<button className="header__signin-button">
					<Link to="/signin">
						<h3 className="header__signin-button-text">Sign in</h3>
					</Link>
				</button>
			)}

			{signedin && (
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
