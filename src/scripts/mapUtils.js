export const centerMap = (markers, startingPoint, mapRef) => {
	/* eslint-disable */
	const bounds = new google.maps.LatLngBounds();

	markers.forEach((marker) => {
		bounds.extend(
			new google.maps.LatLng(marker.latitude, marker.longitude)
		);
	});

	bounds.extend(startingPoint);
	/* eslint-enable */
	mapRef.current.fitBounds(bounds);
	mapRef.current.setTilt(30);
}

export const changeMapZoom = (direction, mapRef) => {
	// set selected route to display route details in route details panel

	// handle map bound
	const directionBounds = direction.routes?.[0]?.bounds;

	/* eslint-disable */
	const bounds = new google.maps.LatLngBounds();
	bounds.extend(
		new google.maps.LatLng(
			directionBounds.getSouthWest().lat(),
			directionBounds.getSouthWest().lng()
		)
	);
	bounds.extend(
		new google.maps.LatLng(
			directionBounds.getNorthEast().lat(),
			directionBounds.getNorthEast().lng()
		)
	);
	/* eslint-enable */
	mapRef.current.fitBounds(bounds);
	mapRef.current.setTilt(30);
}