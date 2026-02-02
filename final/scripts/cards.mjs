import { fetchCards } from "./api.mjs";
import { navigation } from "./navigation.mjs"

const cardGrid = document.querySelector(".card-grid");
const paginationContainer = document.querySelector(".page-navigation");

function displayCards(cards) {
    if (!cards || !cards.current) {
        cardGrid.innerHTML = "<p>No cards found.</p>";
        return;
    }
    cards.current.forEach(card => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.innerHTML = `
        <img src="images/card-thumbnails/t_${card.image}.webp" alt="${card.name}" loading="lazy">
        <strong>${card.name}</strong>
        <p><i>Character: ${card.character}</i></p>
        <p>Rarity: ${card.rarity}</p>
        <p>Attribute: ${card.attribute}</p>
        `;
        cardGrid.appendChild(cardElement);
    });
}

const nav = new navigation(".page-navigation", handlePageChange);

async function handlePageChange(newPage, data) {
    if (!data) {
        data = await fetchCards(newPage);
    }
    cardGrid.innerHTML = "";
    displayCards(data);
    window.history.pushState({}, "", `?page=${newPage}`);
    window.scrollTo(0, 0);
}

const urlParams = new URLSearchParams(window.location.search);
const currentPage = parseInt(urlParams.get("page")) || 1;

async function init() {
    const initialData = await fetchCards(currentPage);
    nav.createPagination(initialData.total_pages);
    handlePageChange(currentPage, initialData);
    nav.setActiveButton(currentPage);
}

init();
