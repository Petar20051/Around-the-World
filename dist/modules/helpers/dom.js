export function createElement({ type, className, text }) {
    const el = document.createElement(type);
    if (className) {
        el.classList.add(className);
    }
    if (text) {
        el.textContent = text;
    }
    return el;
}
export function updateFieldIfChanged({ card, selector, newValue }) {
    const el = card.querySelector(selector);
    if (el && el.textContent !== newValue) {
        el.textContent = newValue;
    }
}
