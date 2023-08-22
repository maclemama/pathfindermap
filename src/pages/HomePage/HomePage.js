import { useEffect, useState } from "react";
// import getUserLocation from "../../scripts/locationUtilis";
import "./HomePage.scss";

function HomePage() {
	const [currentLocation, SetCurrentLocation] = useState();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
        // get user current location
		// getUserLocation()
		// 	.then((location) => {
		// 		console.log(location);
		// 		SetCurrentLocation(location.coords);
		// 		setIsLoading(false);
		// 	})
		// 	.catch((err) => console.log(err));
	}, []);
	if (isLoading) {
		return <h1>loading </h1>;
	}
	return (
		<>
			<h1 className="page">this is home page</h1>
			{/* <p className="showMyLocation">
				Accuracy:{currentLocation.accuracy} <br />
                altitude:{currentLocation.altitude} <br />
                altitudeAccuracy:{currentLocation.altitudeAccuracy} <br />
                heading:{currentLocation.heading} <br />
                latitude:{currentLocation.latitude} <br />
                longitude:{currentLocation.longitude} <br />
                speed:{currentLocation.speed}
			</p> */}
		</>
	);
}

export default HomePage;
