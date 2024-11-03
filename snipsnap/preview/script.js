document.addEventListener("DOMContentLoaded", async () => {
    const screenshot = await chrome.storage.local.get()
    document.getElementById("screenshot").src = screenshot.dataUrl
})
