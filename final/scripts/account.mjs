import { getUserInformation } from "./api.mjs";


async function init() {
    const userData = await getUserInformation();
    console.log(userData);
}

init();
