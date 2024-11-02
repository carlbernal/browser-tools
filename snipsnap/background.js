chrome.runtime.onInstalled.addListener((details) => {
    console.log("Extension installed");
})

chrome.runtime.onStartup.addListener(() => {
    // TODO: check if user is logged-in
    console.log("User active");
})

chrome.action.onClicked.addListener((tab) => {
    /*
     * TODO
     * 1. Take a snapshot of the current page
     * 2. Display edit page, allow user to add annotation similar to mac preview
     * 3. After every changes, update image stored in storage
     * 4. In edit page, show option to copy storage URL or image file
     */
    console.log("Extension clicked");
})

