const getUserLocation = () => {
	return new Promise((resolve, reject) => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((location) =>{
                console.log(location)
				resolve(location);
            });
		} else {
            console.log("No geolocation")
			reject("No geolocation")
		}
	});
};

export default getUserLocation;
