const loader = document.getElementById('loader-container');
const refreshBtn = document.querySelector('refresh-btn');
const newUserBtn = document.querySelector('new-users-btn');
const cardsContainer = document.querySelector('.card-list');
export function setLoadingState(isLoading) {
    setVisualLoading(isLoading);
    setButtonsEnabled(!isLoading);
}
function setVisualLoading(isLoading) {
    if (loader && cardsContainer) {
        loader.classList.toggle('hidden', !isLoading);
        cardsContainer.classList.toggle('hidden', isLoading);
    }
}
function setButtonsEnabled(enabled) {
    if (refreshBtn && newUserBtn) {
        refreshBtn.disabled = !enabled;
        newUserBtn.disabled = !enabled;
    }
}
