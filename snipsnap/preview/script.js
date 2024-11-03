const API_KEY = ""
const UPLOAD_URI = "https://www.googleapis.com/upload/drive/v3/files"
const METADATA_URI = "https://www.googleapis.com/drive/v3/files"

document.addEventListener("DOMContentLoaded", async () => {
    const screenshot = await chrome.storage.local.get()
    document.getElementById("screenshot").src = screenshot.dataUrl

    addAuth(createScreenshotMetadata, screenshot)
})

async function createScreenshotMetadata(token, screenshot) {
    const req = new Request(METADATA_URI, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: screenshot.title })
    })
    try {
        const res = await fetch(req)
        const payload = await res.json()
        console.log(payload)
    } catch (err) {
        console.error(err)
    }
}

function uploadScreenshot(token, screenshot) {
}

async function addAuth(func, screenshot) {
    try {
        chrome.identity.getAuthToken(
            { interactive: true },
            (token) => { func(token, screenshot) }
        )
    } catch (err) {
        console.error(err)
    }
}
