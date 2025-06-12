
const loader = document.getElementById('loader-container');
const refreshBtn = document.getElementById('refresh-btn');
const newUserBtn = document.getElementById('new-users-btn');
const cardsContainer = document.querySelector('.card-list');

export function toggleLoader(isLoading) {
    loader.classList.toggle('hidden', !isLoading);
    refreshBtn.disabled = isLoading;
    newUserBtn.disabled = isLoading;
    cardsContainer.classList.toggle('hidden', isLoading);
}


