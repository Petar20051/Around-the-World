import {ZodSchema} from 'zod';
import {User} from './user';

export type createElementParams = {
	type: string;
	className?: string;
	text?: string;
};

export type updateFieldParams = {
	card: Element;
	selector: string;
	newValue: string;
};

export type withRetryParams<T> = {
	fnToRetry: () => Promise<T>;
	retries?: number;
	delayMs?: number;
	errorMessage?: string;
};

export type fetchCoordinatesByLocationParams = {
	city: string;
	country: string;
};

export type fetchCurrentWeatherStatsParams = {
	latitude: number;
	longitude: number;
};

export type getUsersInfoParams = {
	userCount?: number;
	nationality?: string;
};

export type fetchJSONParams = {
	url: string;
	errorMsg?: string;
};

export type saveToLocalStorageParams = {
	key: string;
	value: unknown;
};
export type buildUrlParams = {
	baseUrl: string;
	queryParams?: Record<string, string | number | undefined>;
};

export type handleSameNationalityClickParams = {
	user: User;
	users: User[];
};

export type ParseWithSchemaParams<T> = {
	schema: ZodSchema<T>;
	data: unknown;
	errorMsg?: string;
};
