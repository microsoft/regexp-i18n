import { Range } from '../src/Range';

describe('Range', () => {
    let range: Range;
    beforeAll(() => {
        range = new Range([0, 70], [[2, 2], [4, 5], [10, 15], [32, 40], [50, 50]]).invert().invert();
    });

    it('.in() left out of range', () => {
        expect(false).toBe(range.in(1));
    });

    it('.in() right out of range', () => {
        expect(false).toBe(range.in(51));
    });

    it('.in() right range edge', () => {
        expect(true).toBe(range.in(2));
    });

    it('.in() middle test', () => {
        expect(true).toBe(range.in(10));
        expect(true).toBe(range.in(15));
    });

    it('.in() left range inclusive', () => {
        expect(true).toBe(range.in(5));
    });

    it('.in() left range edge', () => {
        expect(true).toBe(range.in(50));
    });

    it('.out() left range beyond the limit', () => {
        expect(false).toBe(range.out(-1));
    });

    it('.out() right range beyond the limit', () => {
        expect(false).toBe(range.out(71));
    });

    it('.out() left out limit', () => {
        expect(true).toBe(range.out(0));
    });

    it('.out() left in limit', () => {
        expect(false).toBe(range.out(2));
    });

    it('.out() right in limit', () => {
        expect(false).toBe(range.out(50));
    });
});
