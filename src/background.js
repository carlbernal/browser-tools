import "./browser-polyfill.js";

browser.omnibox.onInputEntered.addListener(async (text) => {
  const storage = await browser.storage.sync.get("shortcuts");
  const redirect = storage.shortcuts[text.trim()];

  // Ignore undefined shortcuts
  if (!redirect) {
    return;
  }

  // Open shortcut in new tab to remove focus from omnibox
  const currentTab = await browser.tabs.query({
    active: true,
    windowId: browser.windows.WINDOW_ID_CURRENT,
  });
  browser.tabs.create({
    active: true,
    index: currentTab[0].index,
    url: redirect,
  });
  browser.tabs.remove(currentTab[0].id);
});
