import { useEffect, useState } from "react";

export type Location = {
	lat: number
	lng: number
}

const useLocation = (): Location => {

	const [ { lat, lng }, setUserLocalization] = useState<Location>({ lat: 0, lng: 0 });

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((loc) => {
			setUserLocalization({ lat: loc.coords.latitude, lng: loc.coords.longitude });
		});
	}, []);

	return { lat, lng }
}

export default useLocation;