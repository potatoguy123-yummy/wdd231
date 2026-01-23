const lat = "32.75903982528879";
const lon = "-97.34283486200894";
const apiKey = "cbb1fea32204591dafa9b40fa8193e6a";

const url = `https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat}&lon=${lon}&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=${lat}&lon=${lon}&appid=${apiKey}`;

function timestampToDisplayTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });
}

async function forecastApiFetch(lat, lon, apiKey) {
    try {
        const response = await fetch(forecastUrl);
        if (!response.ok) throw Error(await response.text());
        const data = await response.json();
        let set = false;
        const dailyData = data.list.filter(e => {
            const rv = e.dt_txt.includes("12:00:00") || set === false; // Noon
            set = true;
            return rv;
        });
        const value = dailyData.slice(0, 3).map(day => ({
            date: day.dt_txt.split(" ")[0],
            temp: day.main.temp,
            description: day.weather[0].description
        }));
        console.log(value);
        displayForecast(value);
        return value;
    } catch(e) {
        console.log("Failed to fetch", e);
        return null;
    }
}

function getWeekday(dateStr) {
    const date = new Date(`${dateStr} UTC-6`);

    return new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        timeZone: "America/Chicago"
    }).format(date);
}

function displayForecast(data) {
    document.getElementById("forecast-today").innerText = data[0].temp;
    document.getElementById("forecast-tomorrow-day").innerText = getWeekday(data[1].date);
    document.getElementById("forecast-tomorrow").innerText = data[1].temp;
    document.getElementById("forecast-tomorrow2-day").innerText = getWeekday(data[2].date);
    document.getElementById("forecast-tomorrow2").innerText = data[2].temp;
}

function displayResult(data) {
    document.getElementById("temp-now").innerText = data.main.temp;
    document.getElementById("temp-high").innerText = data.main.temp_max;
    document.getElementById("temp-low").innerText = data.main.temp_min;
    document.getElementById("humidity").innerText = data.main.humidity;
    document.getElementById("sunrise").innerText = timestampToDisplayTime(data.sys.sunrise);
    document.getElementById("sunset").innerText = timestampToDisplayTime(data.sys.sunset);
    document.getElementById("weather-icon").src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    document.getElementById("weather-icon").alt = data.weather[0].main;
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
forecastApiFetch();
