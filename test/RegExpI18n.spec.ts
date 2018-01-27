import RegExpI18n = require('../src/RegExpI18n');

interface Spec {
    alphabet: string;
    testText: string;
}

// Every spec represens separate langauge
// Languages are ordered in the usage order
const specs: Spec[] = [
    { alphabet: 'Latin', testText: 'abcZYX' },
    { alphabet: 'Latin suplemental', testText: 'ÀÊÖØåöøüÿ'},
    { alphabet: 'Chinese', testText: '他走過城市的狗他的兄弟生氣了'},
    { alphabet: 'Chinese Simplified', testText: '渔夫从远处看见一位渔夫罕见的字符'},
    { alphabet: 'Arabic', testText: 'العربية', },  // 660M
    { alphabet: 'Devenagari', testText: 'अपऌपक'}, //600M+
    { alphabet: 'Eastern Nagari', testText: 'পৰবনগৰ'}, //300M+
    { alphabet: 'Cyrillic', testText: 'НочьУлицаФонарьАптекаЃё'}, //250M+
    { alphabet: 'Kana', testText: 'かなカナウィキペディア日本語版'}, //120+   
    { alphabet: 'Javanese', testText: 'ꦗꦮ'}, //80+    
    { alphabet: 'Hangul', testText: '한글조선글'}, //80+    
];

// replace all not letter characters
const testRegexp = new RegExpI18n('[^\\pL]', 'gi');

describe('SmokeTests', function () {
    specs.forEach(spec => {
        it(spec.alphabet, () => {
            expect(spec.testText.replace(testRegexp, '')).toBe(spec.testText);
        });
    });
    
});
