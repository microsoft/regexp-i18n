import RegExpI18n = require('../src/RegExpI18n');

interface Spec {
    language: string;
    testText;
}

// Every spec represens separate langauge
const specs: Spec[] = [
    {language: 'Latin', testText: 'abcZYX'}
];

// replace all not letter characters
const testRegexp = new RegExpI18n('^[\\pL]/gi');

describe('SmokeTests', function () {
    specs.forEach(spec => {
        it(spec.language, () => {
            expect(spec.testText.replace(testRegexp, '')).toBe(spec.testText);
        });
    });
    
});
