// set photo url fetch from google place api to session storage so that it could be use if the same place appear in the search again, avoid fetching the same photo
export const setPlaceSessionData = (placeID, data) => {
	return sessionStorage.setItem(`place_${placeID}`, data);
};

export const getPlaceSessionData = (placeID) => {
	return sessionStorage.getItem(`place_${placeID}`);
};
