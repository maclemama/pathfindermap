import "./MapMarkerCompass.scss";

function MapMarkerCompass() {
	return (
		<>
			<div
				className="marker-compass"
				style={{
					"--compass":  "90deg",
					"--angle":  "45deg",
				}}
			></div>
		</>
	);
}

export default MapMarkerCompass;
