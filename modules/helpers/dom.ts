export function createElement({type, className, text}: {type: string; className?: string; text?: string}): HTMLElement {
	const el = document.createElement(type);
	if (className) {
		el.classList.add(className);
	}
	if (text) {
		el.textContent = text;
	}
	return el;
}

export function updateFieldIfChanged({card, selector, newValue}: {card: Element; selector: string; newValue: string}): void {
	const el = card.querySelector<HTMLElement>(selector);
	if (el && el.textContent !== newValue) {
		el.textContent = newValue;
	}
}
