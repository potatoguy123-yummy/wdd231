const apiBaseUrl = "http://localhost:8000";
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
