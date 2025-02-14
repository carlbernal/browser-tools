import "./browser-polyfill.js";

document.addEventListener("DOMContentLoaded", async () => {
  const textarea = document.getElementById("textarea");

  // Display shortcuts
  const storage = await browser.storage.sync.get("shortcuts");
  if (storage.shortcuts) {
    textarea.value = JSON.stringify(storage.shortcuts, null, 2);
  }

  // Save shortcuts 0.8 secs after user stops typing
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
});

/** Validate and save shortcuts to browser.storage.sync */
function setShortcuts(shortcutsJson) {
  let shortcuts;
  try {
    shortcuts = JSON.parse(shortcutsJson);
  } catch {
    showToast("Shortcuts must be a valid JSON.");
    return;
  }

  // Make sure url starts with https
  for (let key in shortcuts) {
    if (shortcuts[key].startsWith("http://")) {
      shortcuts[key] = "https://" + shortcuts[key].slice(7);
    } else if (!shortcuts[key].startsWith("https://")) {
      shortcuts[key] = "https://" + shortcuts[key];
    }
  }

  // TODO maybe add proper URL validation

  try {
    browser.storage.sync.set({
      shortcuts: shortcuts,
    });
    showToast("Shortcuts saved!", true);
  } catch (err) {
    console.error(err);
    showToast("Error saving shortcuts to browser.storage.sync!");
  }
}

function showToast(message, autohide = false) {
  const toast = document.getElementById("toast");
  toast.textContent = message;

  toast.classList.remove("hidden");

  if (autohide) {
    setTimeout(() => {
      toast.classList.add("hidden");
    }, 3000);
  }
}
