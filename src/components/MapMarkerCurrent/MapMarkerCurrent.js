import { useEffect, useState, useRef, useCallback } from "react";
import MapMarker from "../MapMarker/MapMarker";
import "./MapMarkerCurrent.scss";

import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { isMobile, isAndroid, isIOS } from "react-device-detect";

import {
	setNavigationModeLoading,
	setNavigationMode,
	setWalkingCurrentDestination,
	setWalkingNextDestinationDistance,
} from "../../store/map/mapSlice";
import {
	selectNavigationModeLoading,
	selectWalkingCurrentDestination,
	selectNavigationMode,
	selectWalkingMode,
	selectAllowGeolocation,
} from "../../store/map/mapSelector";

import MapMarkerCompass from "../MapMarkerCompass/MapMarkerCompass";
import CustomModal from "../Modal/CustomModal";

function MapMarkerCurrent({ map, setMapModal, mapModal }) {
	const dispatch = useDispatch();
	const navigationMode = useSelector(selectNavigationMode);
	const navigationModeLoading = useSelector(selectNavigationModeLoading);
	const walkingMode = useSelector(selectWalkingMode);
	const walkingCurrentDestination = useSelector(
		selectWalkingCurrentDestination
	);
	const allowedGeolocation = useSelector(selectAllowGeolocation);
	const [position, setPosition] = useState(null);
	const [watchID, setWatchID] = useState(null);

	if (walkingMode) {
		const destinationPosition = walkingCurrentDestination?.position;

		if (position && destinationPosition) {
			const distance =
				window.google.maps.geometry.spherical.computeDistanceBetween(
					position,
					destinationPosition
				);

			if (distance < 5) {
				dispatch(
					setWalkingCurrentDestination({
						...walkingCurrentDestination,
						isArrived: true,
					})
				);
			}

			dispatch(setWalkingNextDestinationDistance(Math.floor(distance)));
		}
	}

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
		if (!watchID && navigator.geolocation && allowedGeolocation) {
			id = navigator.geolocation.watchPosition(success, error, options);
			setWatchID(id);
		}
		return () => navigator.geolocation.clearWatch(id);
	}, [navigator, allowedGeolocation]);

	const handleToggleNavigationLoading = () => {
		dispatch(setNavigationModeLoading(!navigationModeLoading));
	};

	if (position && navigationMode) {
		map.setCenter(position);

		if (!isMobile) {
			dispatch(setNavigationModeLoading(false));
			dispatch(setNavigationMode(false));
		}
	}

	const handleModalClose = () => {
		setMapModal([]);
		handleToggleNavigationLoading();
	};

	const orientationHandler = useCallback(
		(orientData) => {
			let newAngle;
			if (isAndroid) {
				newAngle = -(
					orientData.alpha +
					(orientData.beta * orientData.gamma) / 90
				);
				newAngle -= Math.floor(newAngle / 360) * 360;
			}
			if (isIOS) {
				newAngle =
					Math.floor(orientData.webkitCompassHeading) ||
					Math.floor(Math.abs(orientData.alpha - 360));
			}
			
			const newBeta = Math.floor(orientData.beta);

			map.moveCamera({
				heading: newAngle,
				tilt: newBeta,
			});
		},
		[map]
	);

	const handleIOSPermission = () => {
		DeviceOrientationEvent.requestPermission()
			.then((response) => {
				if (response === "granted") {
					window.addEventListener(
						"deviceorientation",
						orientationHandler,
						true
					);
					setMapModal([]);
				}
			})
			.catch((err) =>
				setMapModal([
					<CustomModal
						customModal={{
							title: "Error",
							message: `${err?.message ? err?.message : JSON.stringify(err)}`,
							confirmText: "OK",
						}}
						customModalFunc={handleModalClose}
						customModalCloseFun={handleModalClose}
					/>,
				])
			);
	};

	useEffect(() => {
		if (navigationMode) {
			if (isAndroid) {
				window.addEventListener(
					"deviceorientationabsolute",
					orientationHandler,
					true
				);
			}

			if (isIOS && !mapModal?.[0]) {
				setMapModal([
					<CustomModal
						customModal={{
							title: "Permission Required",
							message:
								"In order to display your current compass orientation, additional permission is required, do you want to proceed?",
							confirmText: "Confirm",
							cancelText: "Cancel",
						}}
						customModalFunc={handleIOSPermission}
						customModalCloseFun={handleModalClose}
					/>,
				]);
			}

			handleToggleNavigationLoading();
			return () => {
				if (isAndroid) {
					window.removeEventListener(
						"deviceorientationabsolute",
						orientationHandler,
						true
					);
				}
				if (isIOS) {
					window.removeEventListener(
						"deviceorientation",
						orientationHandler,
						true
					);
				}
				handleToggleNavigationLoading();
			};
		}
	}, [navigationMode]);

	return (
		<>
			{position && (
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
						{isMobile && navigationMode && <MapMarkerCompass />}
						<div className="marker-current__dot"></div>
					</div>
				</MapMarker>
			)}
		</>
	);
}

export default MapMarkerCurrent;
