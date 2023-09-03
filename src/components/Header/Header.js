import "./Header.scss";
import headerLogo from "../../assets/logos/logo-no-background.png";
import { Link, useLocation } from "react-router-dom";

function Header() {
	const location = useLocation();
	const isSigninPage = location.pathname.toLowerCase().includes("signin");
	const isSignupPage = location.pathname.toLowerCase().includes("signup");

	return (
		<header className="header">
			<button className="header__home-button">
				<Link to="/">
					<img
						src={headerLogo}
						alt="Pathfinder brand logo"
						className="header__logo"
					/>
				</Link>
			</button>

			{isSigninPage || isSignupPage || (
				<button className="header__signin-button">
					<Link to="/signin">
						<h3 className="header__signin-button-text">Sign in</h3>
					</Link>
				</button>
			)}
		</header>
	);
}

export default Header;
