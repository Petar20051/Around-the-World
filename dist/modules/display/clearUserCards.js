export function clearUserCards() {
    const container = document.querySelector('.card-list');
    if (container) {
        container.innerHTML = '';
    }
}
