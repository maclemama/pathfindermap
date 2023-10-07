import "./MapMarkerCompass.scss";
import { useEffect, useState } from "react";
import {isAndroid, isIOS} from "react-device-detect";

function MapMarkerCompass({ map, handleToggleNavigationLoading }) {
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
            if(isIOS) window.addEventListener("deviceorientation", handler, true);
            if(isAndroid) window.addEventListener("deviceorientationabsolute", handler, true);
			handleToggleNavigationLoading();
		}
		return () => {
			if(isAndroid) window.removeEventListener("deviceorientationabsolute", handler, true);
            if(isIOS) window.removeEventListener("deviceorientation", handler, true);
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
