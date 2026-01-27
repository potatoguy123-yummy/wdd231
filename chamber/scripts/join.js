
const timestampInput = document.getElementById('timestamp');
timestampInput.value = new Date().toISOString();

const modals = document.querySelectorAll('dialog');
modals.forEach(modal => {
    const openButton = document.querySelector(`.${modal.id}`);
    openButton.addEventListener('click', e => {
        e.preventDefault();
        modal.showModal();
    });

    const closeButton = modal.querySelector('.close-button');
        closeButton.addEventListener('click', () => {
        modal.close();
        openButton.focus();
    });
});
