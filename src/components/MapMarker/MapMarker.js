import "./MapMarker.scss";
import { useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";

function MapMarker({ position, onClickFuc, map, children, depandState }) {
	const rootRef = useRef();
	const markerRef = useRef();

	useEffect(() => {
		if (!rootRef.current) {
			const container = document.createElement("div");
			rootRef.current = createRoot(container);

			markerRef.current = new window.google.maps.marker.AdvancedMarkerView({
				position,
				content: container,
			});
		}

		return () => (markerRef.current.map = null);
	}, []);

	useEffect(() => {
		rootRef.current.render(children);
		markerRef.current.position = position;
		markerRef.current.map = map;
		const listener = markerRef.current.addListener("gmp-click", onClickFuc);
		return () => listener.remove();
	}, [map, position, depandState]);
}

export default MapMarker;
