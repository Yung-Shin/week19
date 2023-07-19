const butInstall = document.getElementById('buttonInstall');
let beforeInstallEvent;

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    beforeInstallEvent = event;
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    if (beforeInstallEvent) {
        const userChoice = await beforeInstallEvent.prompt();
        if (userChoice.outcome === 'accepted') {
            butInstall.textContent = 'Installed';
            setTimeout(() => { butInstall.style.display = "none"; }, 2000);
        }
    }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('👍', 'appinstalled', event);
});