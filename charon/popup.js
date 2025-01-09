document.addEventListener("DOMContentLoaded", async () => {
  const textarea = document.getElementById("textarea");
  const url = document.getElementById("url");
  const sync = document.getElementById("sync");

  // Set value of textarea to shortcuts
  const storage = await chrome.storage.sync.get("shortcuts");
  if (storage.shortcuts) {
    textarea.value = JSON.stringify(storage.shortcuts, null, 2);
  }

  // Save shortcuts in textarea .8 secs after user stops typing
  let typingTimer;
  const typingDelay = 800;
  textarea.addEventListener("input", () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      setShortcuts(textarea.value);
    }, typingDelay);
  });
  textarea.addEventListener("keydown", () => {
    clearTimeout(typingTimer);
  });

  sync.addEventListener("click", async () => {
    sync.disabled = true
    try {
      // Use URL() object to check if url input is valid url
      const res = await fetch(new URL(url.value.trim()));
      const shortcuts = await res.json();
      setShortcuts(JSON.stringify(shortcuts, null, 2));
    } catch (err) {
      console.error(err);
      window.alert(err);
      sync.disabled = false
    }
    sync.disabled = false
  });
});

function setShortcuts(shortcuts) {
  try {
    chrome.storage.sync.set({
      // TODO add shortcuts entity schema validation
      shortcuts: JSON.parse(shortcuts),
    });
  } catch (err) {
    console.error(err);
    window.alert(err);
  }
}
