
function getUrlParams(url) {
    const params = {};
    const search = url.split('?')[1];

    if (search) {
        const paramPairs = search.split('&');
        for (let i = 0; i < paramPairs.length; i++) {
            const [key, value] = paramPairs[i].split('=');
            params[decodeURIComponent(key)] = decodeURIComponent(value);
        }
    }
    return params;
}

function updateConfirmationDetails(params) {
    const firstNameLabel = document.getElementById("firstNameLabel");
    const lastNameLabel = document.getElementById("lastNameLabel");
    const emailLabel = document.getElementById("emailLabel");
    const mobileLabel = document.getElementById("mobileLabel");
    const orgNameLabel = document.getElementById("orgNameLabel");
    const timestampLabel = document.getElementById("timestampLabel");

    firstNameLabel.innerText = firstNameLabel.innerText + " " + params.firstName;
    lastNameLabel.innerText = lastNameLabel.innerText + " " + params.lastName;
    emailLabel.innerText = emailLabel.innerText + " " + params.email;
    mobileLabel.innerText = mobileLabel.innerText + " " + params.mobile;
    orgNameLabel.innerText = orgNameLabel.innerText + " " + params.orgName;
    timestampLabel.innerText = timestampLabel.innerText + " " + params.timestamp;
}

const url = new URL(window.location.href);
const params = getUrlParams(url.href);

updateConfirmationDetails(params);
