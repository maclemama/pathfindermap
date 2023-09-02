import "./Header.scss";
import headerLogo from "../../assets/logos/logo-no-background.png";
import { Link } from "react-router-dom";

function Header() {
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

			<button className="header__signin-button">
				<Link to="/signin">
					<h3 className="header__signin-button-text">Sign in</h3>
				</Link>
			</button>
		</header>
	);
}

export default Header;
