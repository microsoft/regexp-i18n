/**
 * Range.spec.ts
 * 
 * Copyright (c) Microsoft Corporation 2018. All rights reserved.
 * Licensed under the MIT license
 *
 * Range tests
 */

import { Range } from '../src/Range';
const lowerLimit = 0;
const upperLimit = 70;

const range = new Range([0, 70], [[2, 2], [4, 5], [10, 15], [32, 40], [50, 50]]);
let invertedRange = range.invert();

function testIn(val: number, expected: boolean) {
    expect(range.in(val)).toBe(expected);

    const beyondTheLimit = val < lowerLimit || val > upperLimit;
    const invertedExpected = beyondTheLimit ? expected : !expected;
    expect(invertedRange.in(val)).toBe(invertedExpected);
}

function testOut(val: number, expected: boolean) {
    expect(range.out(val)).toBe(expected);

    const beyondTheLimit = val < lowerLimit || val > upperLimit;
    const invertedExpected = beyondTheLimit ? expected : !expected;
    expect(invertedRange.out(val)).toBe(invertedExpected);
}

describe('Range', () => {

    it('.in() left out of range', () => {
        testIn(1, false);
    });

    it('.in() right out of range', () => {
        testIn(51, false);
    });

    it('.in() right range beyond the limit', () => {
        testIn(71, false);
    });

    it('.in() left beyond the limit', () => {
        testIn(0, false);
    });

    it('.in() right range edge', () => {
        testIn(2, true);
    });

    it('.in() middle in', () => {
        testIn(33, true);
    });

    it('.in() middle out', () => {
        testIn(18, false);
    });

    it('.in() left range inclusive', () => {
        testIn(5, true);
    });

    it('.in() left range edge', () => {
        testIn(50, true);
    });

    it('.out() middle out', () => {
        testOut(18, true);
    });

    it('.out() middle in', () => {
        testOut(33, false);
    });

    it('.out() left range beyond the limit', () => {
        testOut(-1, true);
    });

    it('.out() right range beyond the limit', () => {
        testOut(71, true);
    });

    it('.out() left beyond the limit', () => {
        testOut(0, true);
    });

    it('.out() left edge', () => {
        testOut(2, false);
    });

    it('.out() right edge', () => {
        testOut(50, false);
    });
});
