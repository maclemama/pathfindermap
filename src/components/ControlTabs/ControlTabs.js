import ControlTabButton from "../ControlTabButton/ControlTabButton";
import "./ControlTabs.scss";

function ControlTabs({ tabNames, setActiveTag, activeTab }) {
	return (
		<section className="tabs">
			{tabNames.map((tabName, index) => (
				<ControlTabButton tabName={tabName} setActiveTag={setActiveTag} activeTab={activeTab} key={index}/>
			))}
		</section>
	);
}

export default ControlTabs;
