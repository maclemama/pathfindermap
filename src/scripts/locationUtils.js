import axios from "axios";

const getGoogleGeolocation = async () => {
	try {
		const {
			data: { location },
		} = await axios.post(
			`https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`
		);
		return { location, allowedGeolocation: false };
	} catch (error) {
		return {
			// default starting location (london bridge) if google geolocation api also failed
			location: {
				lat: 51.5026635,
				lng: -0.0972422,
			},
			allowedGeolocation: false,
		};
	}
};

export const getUserLocation = () => {
	return new Promise(async (resolve, reject) => {
		if (navigator?.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(location) => {
					const { latitude, longitude } = location.coords;
					resolve({
						location: {
							lat: latitude,
							lng: longitude,
						},
						allowedGeolocation: true,
					});
				},
				async () => {
					// if h5 permission failed, get from google api
					const googleLocation = await getGoogleGeolocation();
					resolve(googleLocation);
				}
			);
		} else {
			// if not support h5 geo, get from google api
			const googleLocation = await getGoogleGeolocation();
			resolve(googleLocation);
		}
	});
};

export const getGoogleGeocoder = (geoInput) => {
	return new Promise((resolve, reject) => {
		const { location } = geoInput;
		/* eslint-disable */
		const geocoder = new google.maps.Geocoder();
		/* eslint-enable */
		geocoder
			.geocode({ location })
			.then((response) => {
				if (response.results[0]) {
					const matchedPlace = response.results[0];
					resolve(matchedPlace);
				}
			})
			.catch((e) => {
				reject(e);
			});
	});
};
