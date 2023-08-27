import { useMemo, useState } from "react";
import "./ControlMenu.scss";
import ControlTabs from "../ControlTabs/ControlTabs";

function ControlMenu() {
	const tabNames = useMemo(() => ["Home", "Mood", "Random"], []);
	const [activeTab, setActiveTag] = useState(tabNames[0]);
	return (
		<section className="control-menu">
			<ControlTabs tabNames={tabNames} setActiveTag={setActiveTag} activeTab={activeTab}/>
			<article className="tab-content">
				<div className="tab-content__wrapper">
					{activeTab === tabNames[0] && (
						<h1>this is {activeTab}, the first tab</h1>
					)}

					{activeTab === tabNames[1] && (
						<h1>this is {activeTab}, the second tab</h1>
					)}

					{activeTab === tabNames[2] && (
						<h1>this is {activeTab}, the third tab</h1>
					)}
				</div>
			</article>
		</section>
	);
}

export default ControlMenu;
