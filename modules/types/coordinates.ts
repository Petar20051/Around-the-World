export type OpenCageResponse = {
	results: {
		geometry: {
			lat: number;
			lng: number;
		};
	}[];
};

export type Coordinates = {
	lat: number;
	lng: number;
};
