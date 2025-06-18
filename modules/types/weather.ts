export type OpenMeteoResponse = {
	current: {
		temperature_2m: number;
		relative_humidity_2m: number;
		weather_code: number;
	};
};

export type Weather = {
	temperature: number;
	humidity: number;
	condition: string;
};
