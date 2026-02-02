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

        const image = document.createElement("img");
        image.src = `images/card-thumbnails/t_${card.image}.webp`;
        image.alt = card.name;
        image.setAttribute("loading", "lazy");
        cardElement.appendChild(image);

        const strong = document.createElement("strong");
        strong.textContent = card.name;
        cardElement.appendChild(strong);

        const characterParagraph = document.createElement("p");
        const characterI = document.createElement("i");
        characterI.textContent = `Character: ${card.character}`;
        characterParagraph.appendChild(characterI);
        cardElement.appendChild(characterParagraph);

        const rarityParagraph = document.createElement("p");
        rarityParagraph.textContent = `Rarity: ${card.rarity}`;
        cardElement.appendChild(rarityParagraph);

        const attributeParagraph = document.createElement("p");
        attributeParagraph.textContent = `Attribute: ${card.attribute}`;
        cardElement.appendChild(attributeParagraph);

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
