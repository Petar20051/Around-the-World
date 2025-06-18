export type Coordinates = {
	lat: number;
	lng: number;
};

export type Weather = {
	temperature: number;
	humidity: number;
	condition: string;
};

export type User = {
	picture: string;
	fullName: string;
	city: string;
	country: string;
	nationality: string;
	coordinates?: Coordinates;
	weather?: Weather;
};
