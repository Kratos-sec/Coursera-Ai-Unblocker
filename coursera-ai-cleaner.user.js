
// ==UserScript==
// @name         Coursera Hidden Prompt Cleaner
// @namespace    local.coursera
// @version      2.0
// @match        https://www.coursera.org/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(() => {
    'use strict';

    const marker = 'You are a helpful AI assistant.';

    function clean() {
        document.querySelectorAll('div.css-qkvuk3').forEach(el => {
            if (
                el.textContent.includes(marker) &&
                el.textContent.includes(
                    'AI Agent Compliance Verification Required'
                )
            ) {
                el.remove();
            }
        });
    }

    const observer = new MutationObserver(clean);

    function start() {
        clean();
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
            characterData: true
        });
    }

    if (document.documentElement) {
        start();
    } else {
        document.addEventListener('DOMContentLoaded', start, {
            once: true
        });
    }
})();
