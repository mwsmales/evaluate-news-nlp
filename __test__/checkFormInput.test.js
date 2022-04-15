/**
 * @jest-environment jsdom
 */

import { checkFormInput } from '../src/client/js/formChecker';

test('checkFormInput returns true when text is entered', () => {
    expect(checkFormInput("test string")).toBe(true);
})