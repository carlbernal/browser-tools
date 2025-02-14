## Charon

[Canoe icons created by amonrat rungreangfangsai - Flaticon](https://www.flaticon.com/free-icons/canoe)

## Installation:

1. Chrome uses a different web extension manifest format than Firefox and
   Safari. Run the `chrome` npm script to copy the chrome manifest file to the
   build directory or run `firefox` for Firefox and Safari.

2. Load the extension in the `build` directory to your browser.

- Go to
  [about:debugging#/runtime/this-firefox](about:debugging#/runtime/this-firefox)
  and click `Load Temporary Add-on` for Firefox.

- Go to [chrome://extensions/](chrome://extensions/) and click `Load unpacked`
  for chrome. Toggle developer mode in the upper right corner if you haven't
  done so.

## How to use:

1. **Set Up Shortcuts**

- Click the extension icon.

- Type in your shortcuts in JSON format:

  ```json
  {
    "pattern": "url",
    "g": "https://google.com",
    "yt": "https://youtube.com"
  }
  ```

<!--vale off-->

2.  **Activate Omnibox**
<!--vale on-->

- After setting up your shortcuts, you can use the search bar to trigger them.

- In the search bar, type `c` followed by `tab` or `space` to activate the
  extension.

- Then, type your shortcut, for example `g` for Google, and hit enter to
  navigate to the site.
