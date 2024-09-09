chrome.storage.sync.get("customShortcut", (data) => {
    document.addEventListener("click", (event) => {
        const customShortcut = data.customShortcut || "CTRL + ALT + LEFT CLICK";
        const shortcutParts = customShortcut.split(" + ");
        const keysPressed = new Set();

        const button =
            event.button === 0
                ? "LEFT CLICK"
                : event.button === 1
                    ? "MIDDLE CLICK"
                    : event.button === 2
                        ? "RIGHT CLICK"
                        : "";
        keysPressed.add(button);

        if (event.ctrlKey) keysPressed.add("CTRL");
        if (event.altKey) keysPressed.add("ALT");
        if (event.shiftKey) keysPressed.add("SHIFT");
        if (event.metaKey) keysPressed.add("META");

        const allPartsPressed =
            keysPressed.size === shortcutParts.length &&
            shortcutParts.every((part) => keysPressed.has(part));

        if (allPartsPressed) {
            const clickedElement = event.target;
            if (clickedElement.tagName === "IMG") {
                event.preventDefault();
                chrome.runtime.sendMessage({
                    action: "saveImage",
                    imageUrl: clickedElement.src,
                });
            }
        }
    });
});
