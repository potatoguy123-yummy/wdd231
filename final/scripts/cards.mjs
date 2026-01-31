import { fetchCards } from "./api.mjs";

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

function createPagination(totalPages) {
    paginationContainer.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.dataset.page = i;
        button.textContent = i;
        button.addEventListener("click", () => handlePageChange(i));
        paginationContainer.appendChild(button);
    }
}

function setActiveButton(page) {
    const buttons = document.querySelectorAll(".page-navigation button");
    buttons.forEach(button => button.classList.remove("active"));

    const activeButton = document.querySelector(`.page-navigation button[data-page="${page}"]`);
    if (activeButton) {
        activeButton.classList.add("active");
    }
}

async function handlePageChange(newPage) {
    const data = await fetchCards(newPage);
    cardGrid.innerHTML = "";
    displayCards(data);
    window.history.pushState({}, "", `?page=${newPage}`);
    window.scrollTo(0, 0);

    setActiveButton(newPage);
}

const urlParams = new URLSearchParams(window.location.search);
const currentPage = parseInt(urlParams.get("page")) || 1;

async function init() {
    const initialData = await fetchCards(currentPage);
    handlePageChange(currentPage);
    displayCards(initialData);
    createPagination(initialData.total_pages);
}

init();
