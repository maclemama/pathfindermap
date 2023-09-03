import { useEffect, useState } from "react";

function useMediaQuery(mediaQuery) {
	const [matches, setMatches] = useState(false);
	useEffect(() => {
		const matchQueryList = window.matchMedia(mediaQuery);
		function handleChange(e) {
			setMatches(e.matches);
		}
		matchQueryList.addEventListener("change", handleChange);
	}, [mediaQuery]);
	return matches;
}

export default useMediaQuery;
