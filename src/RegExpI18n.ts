 /**
 * RegExpI18n.ts
 * 
 * Copyright (c) Microsoft Corporation 2018. All rights reserved.
 * Licensed under the MIT license
 *
 * I18N aware, reusable helper functions and constants for work with regular expressions and strings.
 */
import Const from './Constants';
import { Range } from './Range';

let nativeUSupported = true;

try {
    // tslint:disable-next-line:no-unused-expression
    new RegExp('', 'u');
} catch {
    nativeUSupported = false;
}
interface CacheRecord {
    matchRegexp: RegExp;
    validator: RegExp;
}
const regexpCache: {[key: string]: CacheRecord} = {};

export const Constants = {
    LETTERS: nativeUSupported ? Const.LETTERS_ASTRAL : Const.LETTERS,
    LETTERS_AND_DIACRITICS: nativeUSupported ? Const.LETTERS_AND_DIACRITICS_ASTRAL : Const.LETTERS_AND_DIACRITICS,
    LETTERS_DIGITS_AND_DIACRITICS: nativeUSupported ? Const.LETTERS_DIGITS_AND_DIACRITICS_ASTRAL : Const.LETTERS_DIGITS_AND_DIACRITICS,
    DIACRITICS: nativeUSupported ? Const.DIACRITICS_ASTRAL : Const.DIACRITICS,
    DIGITS: nativeUSupported ? Const.DIGITS_ASTRAL : Const.DIGITS,
    IGNORABLE_SYMBOLS: nativeUSupported ? Const.IGNORABLE_SYMBOLS_ASTRAL : Const.IGNORABLE_SYMBOLS,
};

export const Ranges = {
    LETTERS: new Range(Const.CODE_POINT_LIMIT, Const.LETTERS_ASTRAL_RANGE),
    LETTERS_AND_DIACRITICS: new Range(Const.CODE_POINT_LIMIT, Const.LETTERS_AND_DIACRITICS_ASTRAL_RANGE),
    LETTERS_DIGITS_AND_DIACRITICS: new Range(Const.CODE_POINT_LIMIT, Const.LETTERS_DIGITS_AND_DIACRITICS_ASTRAL_RANGE),
    DIACRITICS: new Range(Const.CODE_POINT_LIMIT, Const.DIACRITICS_ASTRAL_RANGE),
    DIGITS: new Range(Const.CODE_POINT_LIMIT, Const.DIGITS_ASTRAL_RANGE),
    IGNORABLE_SYMBOLS: new Range(Const.CODE_POINT_LIMIT, Const.IGNORABLE_SYMBOLS_ASTRAL_RANGE),
};

export const Patterns = {
    // Strict letter pattern. Won't match outstanding diacritics
    MATCH_LETTER: '[' + Constants.LETTERS + ']' + '[' + Constants.DIACRITICS + ']?',
};

export function createRegExp(pattern: string, flags?: string) {
    let newFlags = flags ? flags : '';
    if (nativeUSupported) {
        if (newFlags.indexOf('u') === -1) {
            newFlags += 'u';
        }
    }
    return new RegExp(pattern, newFlags);
}

export function replaceNotMatching(pattern: string, replaceValue: string, text: string): string {
    let record = regexpCache[pattern];
    if (!record) {
        record = {
            matchRegexp: createRegExp(pattern + '|.', 'g'),
            validator: createRegExp(pattern)
        };
        regexpCache[pattern] = record;
    }
        
    return text.replace(record.matchRegexp, (ch) => {
        return record.validator.test(ch) ? ch : replaceValue;
    });
}

const MIN_SUPPLEMENTARY_CODE_POINT = 0x010000;

/**
 * Trims the text from all codepoints out of given range.
 * 
 * @param text 
 * @param range 
 */
export function trim(text: string, range: Range): string {
    
    let firstOutOfRange = -1;
    let lastOutOfRange = -1;

    for (let offset = 0; offset < text.length; ) {
        const codePoint = text.charCodeAt(offset);
        const outOfRange = range.out(codePoint);
        const charCount = codePoint >= MIN_SUPPLEMENTARY_CODE_POINT ? 2 : 1;
        if (firstOutOfRange === -1 && outOfRange) {
            firstOutOfRange = offset;
        }

        if (outOfRange) {
            lastOutOfRange = offset + charCount;
        }

        offset += charCount;
    }

    if (firstOutOfRange === -1 || lastOutOfRange === -1) {
        return '';
    } else {
        return text.substring(firstOutOfRange, lastOutOfRange);
    }
}
