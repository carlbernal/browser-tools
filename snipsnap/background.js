chrome.runtime.onInstalled.addListener((details) => {
    console.log("Extension installed");
})

chrome.runtime.onStartup.addListener(() => {
    // TODO: check if user is logged-in
    console.log("User active");
})

chrome.action.onClicked.addListener(async (tab) => {
    /*
     * TODO
     * 1. Take a snapshot of the tab and store the URL and title of the tab
     * 2. Display edit page, allow user to add annotation similar to mac preview
     * 3. Once image edit is done, image is uploaded to cloud provider and is
     * redirected to the cloud provider image view
     */
    const screenshot = {
        title: tab.title,
        url: tab.url,
    }
    screenshot.dataUrl = await chrome.tabs.captureVisibleTab()

    chrome.storage.local.set(
        screenshot,
        () => {
            chrome.tabs.create({url:
                chrome.runtime.getURL("preview/index.html")
            })
        }
    )
})
