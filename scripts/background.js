chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "saveImage",
        title: "Save Image to OneClickImageSave Folder",
        contexts: ["image"],
    });
});

chrome.contextMenus.onClicked.addListener((info) => {
    if (info.menuItemId === "saveImage") {
        saveImage(info.srcUrl);
    }
});

chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "saveImage") {
        saveImage(request.imageUrl);
    }
});

function saveImage(imageUrl) {
    chrome.downloads.download({
        url: imageUrl,
        filename: `OneClickImageSave/${new Date().getTime()}.jpg`,
        saveAs: false,
    });
}
