chrome.omnibox.onInputEntered.addListener(async (name) => {
  const storage = await chrome.storage.sync.get(["shortcuts"]);
  const redirect = storage.shortcuts[name];

  // Ignore undefined shortcuts
  if (!redirect) {
    return;
  }

  // Open shortcut in new tab to remove focus from omnibox
  const currentTab = await chrome.tabs.query({
    active: true,
    windowId: chrome.windows.WINDOW_ID_CURRENT,
  });
  chrome.tabs.create({
    active: true,
    index: currentTab[0].index,
    url: redirect,
  });
  chrome.tabs.remove(currentTab[0].id);
});
