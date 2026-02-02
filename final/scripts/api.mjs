const apiBaseUrl = "http://localhost:8000"; //credentials: 'include'
export async function fetchCards(page) {
    if (isNaN(page)) page = 1;
    try {
        const response = await fetch(`${apiBaseUrl}/api/webui/listCards?page=${page}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching cards:", error);
        return null;
    }
}

export async function fetchMusic(page, lang = "EN") {
    if (isNaN(page)) page = 1;
    const url = `${apiBaseUrl}/api/webui/listMusic?page=${page}&lang=${lang}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching music:", error);
        return null;
    }
}

export async function login(username, password) {
    let options = {
        method: "POST",
        body: JSON.stringify({
            uid: parseInt(username),
            password: password
        }),
        credentials: 'include'
    }
    try {
        const resp = await fetch(`${apiBaseUrl}/api/webui/login`, options);
        const json = await resp.json();
        if (json.result === "ERR") {
            throw new Error(json.message);
        }
    } catch(e) {
        console.error("Error logging in:", e);
        throw e;
    }
    localStorage.setItem("loggedin", "true")
    window.location.href = "account.html"
}

export async function getUserInformation() {
    let options = {
        credentials: 'include'
    }
    try {
        const resp = await fetch(`${apiBaseUrl}/api/webui/userInfo`, options);
        const userData = await resp.json();
        if (userData.result === "ERR") {
            throw new Error(json.message);
        }
        return userData.data;
    } catch(e) {
        window.location.href = "login.html";
        localStorage.removeItem("loggedin");
    }
}

export async function getServerInfo() {
    try {
        const resp = await fetch(`${apiBaseUrl}/api/webui/serverInfo`);
        const data = await resp.json();
        if (data.result === "ERR") {
            throw new Error(json.message);
        }
        return data.data;
    } catch(e) {
        return null;
    }
}

export async function importUser(data) {
    let options = {
        method: "POST",
        body: JSON.stringify(data)
    }
    try {
        const resp = await fetch(`${apiBaseUrl}/api/webui/import`, options);
        const json = await resp.json();
        if (json.result === "ERR") {
            throw new Error(json.message);
        }
        return json;
    } catch(e) {
        console.error("Error importing user:", e);
        throw e;
    }
}

export const clearRateHtmlSrc = `${apiBaseUrl}/live_clear_rate.html`;
