export const getUserLocation = () => {
	return new Promise((resolve, reject) => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((location) => {
				console.log(location);
				resolve(location);
			});
		} else {
			console.log("No geolocation");
			reject("No geolocation");
		}
	});
};

export const getGoogleGeocoder = (geoInput) => {
	return new Promise((resolve, reject) => {
		/* eslint-disable */
		const geocoder = new google.maps.Geocoder();
		/* eslint-enable */
		geocoder
			.geocode(geoInput)
			.then((response) => {
				if (response.results[0]) {
					const matchedPlace = response.results[0];
					resolve(matchedPlace);
				}
			})
			.catch((e) => {
				console.log("Geocoder failed due to: " + e);
				reject(e);
			});
	});
};
