import { useMemo, useState } from "react";
import "./ControlMenu.scss";
import ControlTabs from "../ControlTabs/ControlTabs";

function ControlMenu() {
	const tabNames = useMemo(() => ["search", "mood", "shuffle"], []);
	const [activeTab, setActiveTag] = useState(tabNames[0]);
	return (
		<section className="control-menu">
			<div className="control-menu__group">
				<article className="tab-content">
					<div className="tab-content__wrapper">
						{activeTab === tabNames[0] && (
							<h1>this is {activeTab}, the second tab</h1>
						)}

						{activeTab === tabNames[1] && (
							<h1>this is {activeTab}, the second tab</h1>
						)}

						{activeTab === tabNames[2] && (
							<h1>this is {activeTab}, the third tab</h1>
						)}
					</div>
				</article>
				<ControlTabs
					tabNames={tabNames}
					setActiveTag={setActiveTag}
					activeTab={activeTab}
				/>
			</div>
			{/* <div className="control-menu__group"></div> */}
		</section>
	);
}

export default ControlMenu;
