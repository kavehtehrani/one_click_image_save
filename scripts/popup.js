// Load saved folder name and shortcut when popup is opened
document.addEventListener('DOMContentLoaded', async () => {
    const data = await chrome.storage.sync.get(['customShortcut']);
    const shortcutInput = document.getElementById('shortcutInput');
    shortcutInput.value = data.customShortcut || "CTRL + ALT + LEFT CLICK";
});

let shortcut = {
    ctrl: false, alt: false, shift: false, meta: false, button: null
};


document.getElementById('shortcutInput').addEventListener('mouseup', (event) => {
    event.preventDefault();
    shortcut.ctrl = event.ctrlKey;
    shortcut.alt = event.altKey;
    shortcut.shift = event.shiftKey;
    shortcut.meta = event.metaKey;
    shortcut.button = event.button;
    updateShortcutInput();
});

function updateShortcutInput() {
    const shortcutInput = document.getElementById('shortcutInput');
    let keys = [];
    if (shortcut.ctrl) keys.push('CTRL');
    if (shortcut.alt) keys.push('ALT');
    if (shortcut.shift) keys.push('SHIFT');
    if (shortcut.meta) keys.push('META');
    if (shortcut.button !== null) {
        switch (shortcut.button) {
            case 0:
                keys.push('LEFT CLICK');
                break;
            case 1:
                keys.push('MIDDLE CLICK');
                break;
            case 2:
                keys.push('RIGHT CLICK');
                break;
        }
    }
    shortcutInput.value = keys.join(' + ');
}

document.getElementById('saveShortcut').addEventListener('click', async () => {
    const shortcutInput = document.getElementById('shortcutInput').value;
    try {
        await chrome.storage.sync.set({customShortcut: shortcutInput});
        console.log('Shortcut saved:', shortcutInput);
    } catch (error) {
        console.error('Error saving shortcut:', error);
    }
    window.close()
});