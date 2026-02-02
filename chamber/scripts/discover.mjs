import { discoverData } from './discover-data.mjs';

const visitorInfoSection = document.getElementById("visitor-info");

function displayVisitorInfo() {
    const lastVisitDate = localStorage.getItem("lastVisitDate");
    const currentDate = Date.now();

    if (!lastVisitDate) {
        visitorInfoSection.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisit = parseInt(lastVisitDate);
        const timeDifference = currentDate - lastVisit;
        const daysSinceVisit = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        console.log(daysSinceVisit);

        if (daysSinceVisit < 1) {
            visitorInfoSection.textContent = "Back so soon! Awesome!";
        } else {
            const daysText = daysSinceVisit === 1 ? "day" : "days";
            visitorInfoSection.textContent = `You last visited ${daysSinceVisit} ${daysText} ago.`;
        }
    }
}

function generateCards() {
    const discoverGrid = document.querySelector('.discover-grid');

    discoverData.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("discover-card");

        const title = document.createElement("h2");
        title.textContent = item.name;
        card.appendChild(title);

        const figure = document.createElement("figure");
        const image = document.createElement("img");
        image.src = item.image;
        image.alt = item.name;
        figure.appendChild(image);
        card.appendChild(figure);

        const description = document.createElement("p");
        description.textContent = item.description;
        card.appendChild(description);

        const address = document.createElement("address");
        address.textContent = item.address;
        card.appendChild(address);

        discoverGrid.appendChild(card);
    });
}

generateCards();
displayVisitorInfo();

localStorage.setItem("lastVisitDate", Date.now());
