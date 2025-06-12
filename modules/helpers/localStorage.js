export function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function loadFromLocalStorage(key) {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
}