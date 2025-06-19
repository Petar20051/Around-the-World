import {createElementParams, updateFieldParams} from '../types/paramsTypes';

export function createElement({type, className, text}: createElementParams): HTMLElement {
	const el = document.createElement(type);
	if (className) {
		el.classList.add(className);
	}
	if (text) {
		el.textContent = text;
	}
	return el;
}

export function updateFieldIfChanged({card, selector, newValue}: updateFieldParams): void {
	const el = card.querySelector<HTMLElement>(selector);
	if (el && el.textContent !== newValue) {
		el.textContent = newValue;
	}
}
