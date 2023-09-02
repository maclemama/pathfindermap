import ControlTabButton from "../ControlTabButton/ControlTabButton";
import "./ControlTabs.scss";

function ControlTabs({ tabNames, setActiveTag, activeTab }) {
	const activeColor = [
		"red",
		"#c894d7",
		"#5dda5d"
	]
	return (
		<section className="tabs">
			{tabNames.map((tabName, index) => (
				<ControlTabButton
					tabName={tabName}
					setActiveTag={setActiveTag}
					activeTab={activeTab}
					key={index}
					activeColor={activeColor[index]}
				/>
			))}
		</section>
	);
}

export default ControlTabs;
