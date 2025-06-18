const weatherDescriptions = new Map([
	[0, 'Clear sky'],
	[1, 'Mainly clear'],
	[2, 'Partly cloudy'],
	[3, 'Overcast'],
	[45, 'Fog'],
	[48, 'Fog'],
	[51, 'Drizzle'],
	[53, 'Drizzle'],
	[55, 'Drizzle'],
	[56, 'Freezing Drizzle'],
	[57, 'Freezing Drizzle'],
	[61, 'Rain'],
	[63, 'Rain'],
	[65, 'Rain'],
	[66, 'Freezing rain'],
	[67, 'Freezing rain'],
	[71, 'Snow fall'],
	[73, 'Snow fall'],
	[75, 'Snow fall'],
	[77, 'Snow grains'],
	[80, 'Rain showers'],
	[81, 'Rain showers'],
	[85, 'Snow showers'],
	[86, 'Snow showers'],
	[95, 'Thunderstorm'],
	[96, 'Thunderstorm with slight and heavy hail'],
	[99, 'Thunderstorm with slight and heavy hail'],
]);

export function getWeatherDescription(weatherCode: number): string {
	return weatherDescriptions.get(weatherCode) || 'No information';
}
