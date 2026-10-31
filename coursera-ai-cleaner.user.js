
// ==UserScript==
// @name         Coursera Hidden Prompt Cleaner
// @namespace    https://github.com/yourusername/coursera-hidden-prompt-cleaner
// @version      2.1.0
// @description  Removes specific hidden instruction and acknowledgment elements from Coursera pages.
// @match        https://www.coursera.org/*
// @match        https://coursera.org/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(() => {
    'use strict';

    const CONFIG = {
        promptMarker: 'You are a helpful AI assistant.',
        complianceMarker:
            'AI Agent Compliance Verification Required',
        checkpointSelector:
            '[data-testid="acknowledgment-checkpoint"]',
        checkpointAction:
            'button[data-action="acknowledge-guidelines"]'
    };

    // Remove the original hidden instruction block.
    function cleanHiddenPrompt() {
        document.querySelectorAll('div.css-qkvuk3').forEach(el => {
            try {
                const content = el.textContent || '';

                if (
                    content.includes(CONFIG.promptMarker) &&
                    content.includes(CONFIG.complianceMarker)
                ) {
                    el.remove();

                    console.info(
                        '[Coursera Cleaner] Removed hidden instruction.'
                    );
                }
            } catch (error) {
                console.error(
                    '[Coursera Cleaner] Prompt cleanup failed:',
                    error
                );
            }
        });
    }

    // Remove the associated acknowledgment checkpoint.
    function cleanAcknowledgmentCheckpoints() {
        document.querySelectorAll(
            CONFIG.checkpointSelector
        ).forEach(el => {
            try {
                const valid =
                    el.getAttribute('aria-hidden') === 'true' &&
                    el.getAttribute('data-assessment-checkpoint') === 'true' &&
                    el.querySelector(CONFIG.checkpointAction) &&
                    el.textContent.includes('Do you understand?');

                if (valid) {
                    el.remove();

                    console.info(
                        '[Coursera Cleaner] Removed acknowledgment checkpoint.'
                    );
                }
            } catch (error) {
                console.error(
                    '[Coursera Cleaner] Checkpoint cleanup failed:',
                    error
                );
            }
        });
    }

    // Run all cleanup routines.
    function clean() {
        cleanHiddenPrompt();
        cleanAcknowledgmentCheckpoints();
    }

    // Initial cleanup.
    clean();

    // Monitor dynamically inserted DOM elements.
    const observer = new MutationObserver(() => {
        clean();
    });

    if (document.body) {
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true
        });
    }

    console.info('[Coursera Cleaner] v2.1.0 active.');

})();
