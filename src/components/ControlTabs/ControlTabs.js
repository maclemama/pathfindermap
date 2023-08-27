import "./ControlTabs.scss";

function ControlTabs({ tabNames, setActiveTag, activeTab }) {
	return (
		<section className="tabs">
			{tabNames.map((tabName) => (
				<div className={`tab ${activeTab === tabName ? "tab--active" : ""}`} onClick={() => setActiveTag(tabName)}>
					<h2 className="tab__name">{tabName}</h2>
				</div>
			))}
		</section>
	);
}

export default ControlTabs;
