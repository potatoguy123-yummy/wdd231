const url = "https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json";
const cards = document.querySelector('#cards');

const displayProphets = (prophets) => {
    prophets.forEach(prophet => {
        const card = document.createElement("section");
        const fullName = document.createElement("h2");
        const portrait = document.createElement("img");
        const description = document.createElement("p");
        fullName.innerText = `${prophet.name} ${prophet.lastname}`;

        description.innerText = `Born on ${prophet.birthdate} in ${prophet.birthplace}.
        Died on ${prophet.death}`;

        portrait.setAttribute("src", prophet.imageurl);
        portrait.setAttribute("alt", `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute("loading", "lazy");
        portrait.setAttribute("width", "340");
        portrait.setAttribute("height", "440");

        card.appendChild(fullName);
        card.appendChild(description);
        card.appendChild(portrait);
        cards.appendChild(card);
    });
}

async function getProphetData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.table(data);
        displayProphets(data.prophets); // I don't like this. It should be returned and then this should be called...
        return data.prophets;
    } catch(e) {
        console.error(e);
        return null;
    }
}

getProphetData();
