import {Coordinates} from './coordinates';
import {Weather} from './weather';

export type RandomUserResponse = {
	results: {
		picture: {thumbnail: string};
		name: {first: string; last: string};
		location: {city: string; country: string};
		nat: string;
	}[];
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
