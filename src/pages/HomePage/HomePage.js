import Map from "../../components/Map/Map";
import ControlMenu from "../../components/ControlMenu/ControlMenu";
import "./HomePage.scss";

function HomePage() {
	return (
		<div className="home">
			<Map />
			<ControlMenu />
		</div>
	);
}

export default HomePage;
