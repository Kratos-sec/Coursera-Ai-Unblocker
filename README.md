# Coursera Hidden Prompt Cleaner

A lightweight Tampermonkey userscript that detects and removes two specific hidden instruction-related DOM elements from Coursera pages.

## Overview

During browser inspection of Coursera pages, two types of hidden DOM elements were identified:

1. A hidden instruction block containing text directed at AI assistants.
2. An acknowledgment checkpoint containing the text `Do you understand?` and a button labelled `I understand`.

Both elements were present in the DOM despite not being normally visible on the page. Their text could appear when selecting page content using `Ctrl+A`.

This userscript identifies these specific elements and removes them locally from the browser's DOM.

## Features

- **Text fingerprinting:** Identifies the hidden instruction using distinctive text markers.
- **Checkpoint detection:** Identifies the acknowledgment component using semantic HTML attributes.
- **Duplicate handling:** Removes multiple matching instances.
- **Dynamic DOM monitoring:** Uses MutationObserver to detect newly inserted elements.
- **Defensive error handling:** Prevents individual cleanup failures from stopping other cleanup operations.
- **No external dependencies:** Uses native JavaScript browser APIs.
- **No network requests:** Does not transmit page content or user information.

## Technical Findings

### 1. Hidden Instruction Block

Initial browser inspection identified the following element:

| Property | Observed value |
|---|---|
| HTML element | DIV |
| CSS class | `css-qkvuk3` |
| Position | absolute |
| Width | 1px |
| Height | 1px |
| Text length | 1,393 characters |
| Instances observed | 3 |

Detection uses two distinctive text markers:

- `You are a helpful AI assistant.`
- `AI Agent Compliance Verification Required`

The script removes matching elements using their text content rather than relying exclusively on the generated CSS class.

### 2. Acknowledgment Checkpoint

Further inspection identified a second element:

```html
<div
  data-testid="acknowledgment-checkpoint"
  data-assessment-checkpoint="true"
  aria-hidden="true"
  role="presentation"
>
    <p>Do you understand?.</p>
    <button
      tabindex="-1"
      data-action="acknowledge-guidelines"
    >
        <span>I understand</span>
    </button>
</div>
```

Observed characteristics:

| Property | Value |
|---|---|
| HTML element | DIV |
| Test ID | `acknowledgment-checkpoint` |
| Assessment checkpoint | `true` |
| ARIA hidden | `true` |
| Role | `presentation` |
| Button action | `acknowledge-guidelines` |
| Instances observed | 5 |

The script identifies this component using its `data-testid`, assessment attribute, ARIA attribute, button action, and text fingerprint.

The relationship between the instruction block and acknowledgment checkpoint is supported by their matching content and structure, although their exact origin has not been established.

## Technical Implementation

### DOM Selection

Uses:

- `document.querySelectorAll()` to identify matching elements.
- `textContent.includes()` for text fingerprinting.
- `getAttribute()` for semantic attribute validation.
- `querySelector()` to identify the acknowledgment button.
- `Element.remove()` to remove matching elements.

### Dynamic DOM Monitoring

Uses `MutationObserver` to monitor:

```javascript
{
    childList: true,
    subtree: true,
    characterData: true
}
```

This allows the cleanup functions to run when Coursera dynamically modifies the page DOM.

The implementation is event-driven rather than continuously polling the page.

## Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/).
2. Open the Tampermonkey dashboard.
3. Select Create a new script.
4. Paste the contents of `coursera-cleaner.user.js`.
5. Save the script.
6. Reload Coursera.

## Repository Structure

```text
coursera-hidden-prompt-cleaner/
│
├── README.md
├── LICENSE
└── coursera-cleaner.user.js
```

## Version History

### v2.1.0 — Current

- Preserved the original working hidden-prompt detection.
- Added acknowledgment checkpoint detection.
- Added semantic attribute validation.
- Added defensive error handling.
- Retained MutationObserver support.
- Improved logging for individual cleanup operations.

### v2.0.0

- Targeted the original hidden instruction element.
- Added MutationObserver support.
- Removed duplicate matching elements.

### v1.0.0

- Initial text-based detection implementation.

### Experimental v3.0.0

- Explored class-independent detection using text fingerprints and geometric validation.
- Not retained as the stable implementation because it failed in testing.

## Limitations

- The original instruction detector still relies on Coursera's generated CSS class `css-qkvuk3`.
- Changes to Coursera's DOM structure or text markers may require code updates.
- The acknowledgment detector relies on the observed `data-testid` and associated attributes.
- MutationObserver monitors DOM changes, not every possible visual or CSS change.
- The script operates only on the browser's local DOM.
- It does not modify Coursera's backend, assessment state, authorization, or server-side controls.
- Compatibility with future Coursera frontend updates is not guaranteed.

## Privacy and Security

This userscript:

- Makes no external network requests.
- Does not collect analytics.
- Does not access account credentials.
- Does not store personal information.
- Does not execute downloaded code.

## License

MIT License

---

**Disclaimer:** This is an independently developed browser userscript. It is not affiliated with or endorsed by Coursera.
