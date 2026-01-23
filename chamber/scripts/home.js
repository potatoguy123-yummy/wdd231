const business = document.getElementById("business");

function membershipToText(text) {
    if (text === 3) return "Gold";
    if (text === 2) return "Silver";
    return "Member";
}

function displayItem(item) {
    const div = document.createElement("div");
    div.classList.add("card");

    const imageDiv = document.createElement("div");
    imageDiv.classList.add("image");

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.name;

    imageDiv.appendChild(img);

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("card-content");

    const addressP = document.createElement("p");
    addressP.innerText = item.address;

    const phoneP = document.createElement("p");
    phoneP.innerText = item.phone;

    const websiteP = document.createElement("a");
    websiteP.innerText = item.website;
    websiteP.href = item.website;

    const membershipP = document.createElement("p");
    membershipP.innerText = "Membership: " + membershipToText(item.level);

    infoDiv.appendChild(addressP);
    infoDiv.appendChild(phoneP);
    infoDiv.appendChild(websiteP);
    infoDiv.appendChild(membershipP);
    
    const h2 = document.createElement("h2");
    h2.innerText = item.name;

    div.appendChild(h2);
    div.appendChild(imageDiv);
    div.appendChild(infoDiv);
    
    business.appendChild(div);
}

fetch("data/members.json").then(async result => {
    const json = await result.json();
    let sorted = json.filter(e => {
        return e.level === 2 || e.level == 3;
    }).sort(() => Math.random() - 0.5).sort(() => Math.random() - 0.5).slice(0, 3);
    sorted.forEach(displayItem);
});
