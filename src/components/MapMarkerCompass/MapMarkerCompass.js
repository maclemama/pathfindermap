import "./MapMarkerCompass.scss";
import { useEffect, useState } from "react";

function MapMarkerCompass({ map, handleToggleNavigationLoading, position }) {
	const [orientation, setOrientation] = useState(null);
	const [deviceAngle, setDeviceAngle] = useState(null);

	useEffect(() => {
		function handler(orientData) {
			let compass = -(
				orientData.alpha +
				(orientData.beta * orientData.gamma) / 90
			);
			compass -= Math.floor(compass / 360) * 360; // Wrap to range [0,360]
			setOrientation(compass);
			setDeviceAngle(orientData);
			map.setTilt(orientData.beta);
			map.setHeading(compass);
		}

		if (window.DeviceOrientationEvent) {
			map.setCenter(position);
			window.addEventListener("deviceorientationabsolute", handler, true);
			handleToggleNavigationLoading();
		}
		return () => {
			window.removeEventListener("deviceorientationabsolute", handler, true);
			handleToggleNavigationLoading();
		};
	}, []);

	return (
		orientation && (
			<div
				className="marker-compass"
				style={{
					"--compass": Math.round(orientation) + "deg",
					"--angle": Math.round(deviceAngle.beta) + "deg",
				}}
			></div>
		)
	);
}

export default MapMarkerCompass;
