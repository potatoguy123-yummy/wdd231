//49.749759777779126, 6.639914572116288
const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");

const lat = "49.75480461374866";
const lon = "6.632106359891859";
const apiKey = "cbb1fea32204591dafa9b40fa8193e6a";

const url = `https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat}&lon=${lon}&appid=${apiKey}`;

function displayResult(data) {
    currentTemp.innerText = data.main.temp;
    weatherIcon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    weatherIcon.alt = data.weather[0].main;
    captionDesc.innerText = data.weather[0].description;
}

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw Error(await response.text());
        const data = await response.json();
        console.log(data);
        displayResult(data);
        return data;
    } catch(e) {
        console.log("Failed to fetch", e);
        return null;
    }
}

apiFetch();
