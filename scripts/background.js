chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "saveImage",
    title: "Save Image to Custom Folder",
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
  chrome.storage.sync.get("customFolder").then((data) => {
    const folder = data.customFolder || "OneClickImageSave";
    console.log(data.customFolder);

    chrome.downloads.download({
      url: imageUrl,
      filename: `${folder}/${new Date().getTime()}.jpg`,
      saveAs: false,
    });
  });
}
