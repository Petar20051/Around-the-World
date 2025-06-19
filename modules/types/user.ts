import {Coordinates} from './coordinates';
import {Weather} from './weather';

export type User = {
	picture: string;
	fullName: string;
	city: string;
	country: string;
	nationality: string;
	coordinates?: Coordinates;
	weather?: Weather;
};
