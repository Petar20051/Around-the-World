const loader = document.getElementById('loader-container');
const refreshBtn = document.getElementById('refresh-btn');
const newUserBtn = document.getElementById('new-users-btn');
const cardsContainer = document.querySelector('.card-list');

export function setLoadingState(isLoading) {
    setVisualLoading(isLoading);
    setButtonsEnabled(!isLoading);
}

function setVisualLoading(isLoading) {
    loader.classList.toggle('hidden', !isLoading);
    cardsContainer.classList.toggle('hidden', isLoading);
}

function setButtonsEnabled(enabled) {
    refreshBtn.disabled = !enabled;
    newUserBtn.disabled = !enabled;
}



