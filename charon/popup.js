document.addEventListener("DOMContentLoaded", async () => {
  const textarea = document.getElementById("textarea");
  const url = document.getElementById("url");
  const sync = document.getElementById("sync");

  const storage = await chrome.storage.sync.get("shortcuts");
  if (typeof storage !== "undefined") {
    textarea.value = JSON.stringify(storage.shortcuts, null, 2);
  }

  // Save shortcuts in textarea 1 sec after typing
  let timeout;
  textarea.addEventListener("input", () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      try {
        chrome.storage.sync.set({
          shortcuts: JSON.parse(textarea.value),
        });
      } catch (err) {
        // TODO log errors to a file
        console.log(err);
      }
    }, 1000);
  });

  url.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      syncShortcuts(url.value);
    }
  });

  sync.addEventListener("click", (event) => {
    syncShortcuts(url.value);
  });
});

async function syncFromUrl(url) {
  try {
    new URL(url);
    const data = await fetch(url);
    chrome.storage.sync.set({
      shortcuts: JSON.parse(data),
    });
  } catch (err) {
    // TODO log errors to a file
    console.log(err);
  }
}
