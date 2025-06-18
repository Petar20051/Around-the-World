import {createElement} from '../helpers/dom.js';
import {User} from '../types/user.js';
import {handleSameNationalityClick} from '../ui/handleSameNationalityClick.js';
import {setLoadingState} from '../ui/loader.js';

export function renderUserCards(users: User[]): void {
	const container = document.querySelector('.card-list');
	if (!container) return;
	container.innerHTML = '';

	const fragment = document.createDocumentFragment();

	users.forEach((user) => {
		const card = createElement({type: 'div', className: 'card'});

		const img = createElement({type: 'img'}) as HTMLImageElement;
		img.src = user.picture;

		const name = createElement({type: 'h3', className: 'name', text: user.fullName});
		const location = createElement({type: 'h4', className: 'location', text: `${user.city}, ${user.country}`});

		const temp = createElement({
			type: 'p',
			className: 'temperature',
			text: user.weather ? `Temp: ${user.weather.temperature} °C` : 'Weather unavailable',
		});

		const humidity = createElement({
			type: 'p',
			className: 'humidity',
			text: user.weather ? `Humidity: ${user.weather.humidity} %` : '',
		});

		const condition = createElement({
			type: 'p',
			className: 'condition',
			text: user.weather ? `Condition: ${user.weather.condition}` : '',
		});

		const btnSameNationality = createElement({
			type: 'a',
			className: 'btn',
			text: 'Same nationality',
		});

		btnSameNationality.addEventListener('click', async () => {
			setLoadingState(true);
			await handleSameNationalityClick({user: user, users: users});
			setLoadingState(false);
		});

		card.append(img, name, location, temp, humidity, condition, btnSameNationality);
		fragment.appendChild(card);
	});

	container.appendChild(fragment);
}
