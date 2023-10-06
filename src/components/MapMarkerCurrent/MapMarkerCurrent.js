import { useEffect, useState } from "react";
import MapMarker from "../MapMarker/MapMarker";
import "./MapMarkerCurrent.scss";
import { motion } from "framer-motion";

function MapMarkerCurrent({ map }) {
	const [position, setPosition] = useState(null);
	const [watchID, setWatchID] = useState(null);
	const [orientation, setOrientation] = useState(null);

	useEffect(() => {
		function success(pos) {
			const coordinate = pos.coords;
			if (coordinate.latitude && coordinate.longitude) {
				setPosition({
					lat: coordinate.latitude,
					lng: coordinate.longitude,
				});
			}
		}

		function error(err) {
			console.error(`ERROR(${err.code}): ${err.message}`);
		}
		const options = {
			enableHighAccuracy: true,
			timeout: 10000,
			maximumAge: 0,
		};

		let id;
		if (!watchID && navigator.geolocation) {
			id = navigator.geolocation.watchPosition(success, error, options);
			setWatchID(id);
		}
		return () => navigator.geolocation.clearWatch(id);
	}, [navigator]);

	useEffect(() => {
		let chromeOrientation;
		if (window.DeviceOrientationEvent) {
			chromeOrientation = window.addEventListener(
				"deviceorientationabsolute",
				function (orientData) {
					let compass = -(
						orientData.alpha +
						(orientData.beta * orientData.gamma) / 90
					);
					compass -= Math.floor(compass / 360) * 360; // Wrap to range [0,360]
					setOrientation(compass);
					// map.setHeading(compass);
				},
				true
			);
		}

		return () => {
			window.removeEventListener(
				"deviceorientationabsolute",
				chromeOrientation
			);
		};
	}, []);

	return (
		position && (
			<MapMarker position={position} map={map}>
				<div className="marker-current">
					<motion.div
						className="marker-current__wave"
						animate={{
							scale: [1, 1.2, 1.6],
							opacity: [1, 0.8, 0],
						}}
						transition={{
							duration: 1.5,
							ease: "easeInOut",
							repeat: Infinity,
							repeatDelay: 1,
						}}
					/>
					<motion.div
						className="marker-current__wave"
						animate={{
							delay: 0.5,
							scale: [1, 1.6, 2.2],
							opacity: [1, 0.5, 0],
						}}
						transition={{
							duration: 1.5,
							ease: "easeInOut",
							repeat: Infinity,
							repeatDelay: 1,
						}}
					/>
					{orientation && (
						<div
							className="marker-current__compass"
							style={{ "--compass": Math.round(orientation) + "deg" }}
						></div>
					)}
					<div className="marker-current__dot"></div>
				</div>
			</MapMarker>
		)
	);
}

export default MapMarkerCurrent;
