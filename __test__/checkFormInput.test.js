/**
 * @jest-environment jsdom
 */

import { checkFormInput } from '../src/client/js/formChecker';

test('checkFormInput returns true when text is entered', () => {
    // set document fragment to test on
    document.body.innerHTML = 
    '<form class="inputForm" id="inputForm">'+
        '<label></label>'+
        '<textarea id="inputPara"></textarea>'+
        '<input type="button" name="" value="Analyze!">'+
        '<label id="errorMessage"></label>'+
    '</form>'

    expect(checkFormInput("test string")).toBe(true);
})