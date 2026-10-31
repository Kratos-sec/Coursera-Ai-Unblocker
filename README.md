# Coursera Hidden Prompt Cleaner

A lightweight Tampermonkey userscript that detects and removes a specific hidden instruction block from Coursera pages.

## Overview

Some Coursera pages may contain hidden text that is not visually rendered but becomes visible when selecting page content using `Ctrl+A`.

This script identifies a particular instruction block using distinctive text markers and its hidden DOM characteristics, then removes the matching element.

## Features

- **Text fingerprinting:** Identifies the target using two distinctive text markers.
- **DOM inspection:** Checks element positioning and dimensions before removal.
- **Dynamic monitoring:** Uses `MutationObserver` to detect newly inserted elements.
- **Duplicate handling:** Removes multiple matching instances.
- **Performance-conscious:** Processes added DOM subtrees rather than repeatedly scanning the entire page.
- **No external dependencies:** Uses native JavaScript browser APIs.
- **No network requests:** Does not transmit page content or user information.

## Technical Implementation

### Detection mechanism

The initial investigation identified the following characteristics:

| Property | Observed value |
|---|---|
| Element | DIV |
| Original CSS class | `css-qkvuk3` |
| Position | absolute |
| Width | 1px |
| Height | 1px |
| Visibility | visible |
| Opacity | 1 |
| Duplicate instances | 3 |

The original implementation relied on the generated CSS class.

Version 3.0 replaces that dependency with text fingerprinting and geometric checks.

### DOM monitoring

The script uses:

- `document.createTreeWalker()` to inspect text nodes.
- `getComputedStyle()` to inspect positioning.
- `getBoundingClientRect()` to inspect element dimensions.
- `MutationObserver` to monitor dynamically inserted content.
- `WeakSet` to avoid processing the same element repeatedly.

## Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/).
2. Open the Tampermonkey dashboard.
3. Select Create a new script.
4. Paste the contents of `coursera-cleaner.user.js`.
5. Save the script.
6. Reload the Coursera page.

## Configuration

The detection parameters can be modified in the `CONFIG` object:

- `markers`: Distinctive text strings used for identification.
- `maxWidth`: Maximum permitted element width.
- `maxHeight`: Maximum permitted element height.

Both text markers must match, and the element must satisfy the geometric checks before removal.

## Limitations

- Designed around the DOM structure observed during development.
- Changes to Coursera's wording or hidden-element implementation may require updated detection logic.
- Does not intercept network responses or modify Coursera's backend.
- Does not guarantee compatibility with every Coursera page or future frontend release.

## Privacy

This userscript:
- Makes no external network requests.
- Does not collect analytics.
- Does not access account credentials.
- Does not store personal information.

## Version History

### v3.0.0
- Removed dependency on generated CSS class names.
- Added text fingerprinting.
- Added hidden-element geometry validation.
- Improved dynamic DOM monitoring.
- Added defensive error handling.
- Improved scanning efficiency.

### v2.0.0
- Targeted the hidden `css-qkvuk3` element.
- Added MutationObserver support.
- Removed duplicate matching elements.

### v1.0.0
- Initial text-based detection implementation.

## License

MIT License

---

**Disclaimer:** This is an independently developed browser userscript. It is not affiliated with or endorsed by Coursera.
