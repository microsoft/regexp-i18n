/**
 * IgnoredSymbols.spec.ts
 *
 * Copyright (c) Microsoft Corporation 2018. All rights reserved.
 * Licensed under the MIT license
 *
 * Ignored Symbols tests
 */

import { createRegExp, Patterns } from '../src/RegExpI18n';

const IgnoredRegexp = createRegExp(Patterns.MATCH_IGNORABLE_SYMBOLS, 'g');

function replaceIgnored(text: string): string {
    return text ? text.replace(IgnoredRegexp, '') : text;
}

describe('IgnoredSymbols', () => {
    it('Ignored symbols removed', () => {
        const actual = replaceIgnored('\u200e\u200f');
        const expected = '';
        expect(actual).toBe(expected);
    });

    it('Ignore doesn\'t affect latin letters', () => {
        const original = 'abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ';
        const actual = replaceIgnored(original);        
        expect(actual).toBe(original);
    });

    it('Ignore doesn\'t affect numbers', () => {
        const original = '0123456789';
        const actual = replaceIgnored(original);
        expect(actual).toBe(original);
    });

    it('Ignore doesn\'t affect specials', () => {
        const original = '~!@#$%^&?*()_+-=`\'\";[]{}\\|/,.<>';
        const actual = replaceIgnored(original);
        expect(actual).toBe(original);
    });

    it('Ignore doesn\'t affect combined emoticons', () => {
        const original = '‍🏳️‍🌈 👨‍👨‍👦 👩‍❤️‍💋‍👨';
        const actual = replaceIgnored(original);
        expect(actual).toBe(original);
    });
    

    it('Mixed test', () => {
        const original = 'af\u200ef\u200fxad';
        const actual = replaceIgnored(original);
        const expected = 'affxad';
        expect(actual).toBe(expected);
    });

});
