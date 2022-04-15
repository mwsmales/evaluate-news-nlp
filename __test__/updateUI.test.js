/**
 * @jest-environment jsdom
 */

import { updateUI } from '../src/client/js/formHandler';

test('check updateUI runs', () => {
    const sentiment = {
        "text": "sample text",
        "agreement": "DISAGREEMENT",
        "confidence": "92",
        "irony": "NONIRONIC",
        "score_tag": "P",
        "subjectivity": "OBJECTIVE"
    };

    // set document fragment to test on
    document.body.innerHTML = '<div id="results"></div>';

    updateUI(sentiment);
})