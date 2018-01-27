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
    // { alphabet: 'Devenagari', testText: 'देवनागरी लिपि'}, //600M+
    { alphabet: 'Eastern Nagari', testText: 'পৰবনগৰ'}, //300M+
    { alphabet: 'Cyrillic', testText: 'НочьУлицаФонарьАптекаЃё'}, //250M+
    { alphabet: 'Kana', testText: 'かなカナウィキペディア日本語版'}, //120M+   
    { alphabet: 'Javanese', testText: 'ꦗꦮ'}, //80M+    
    { alphabet: 'Hangul', testText: '한글조선글'}, //80M+    
    //{ alphabet: 'Telugu', testText: 'తెలుగు'}, //74M+
    //{ alphabet: 'Tamil', testText: 'தமிழ்'}, //60M+
    // { alphabet: 'Gujarati', testText: 'ગુજરાતી'}, //48M+
    //{ alphabet: 'Kannada', testText: 'ಕನ್ನಡ'}, // 45M+
    //{ alphabet: 'Burmese', testText: 'မြန်မာ'}, //39M+
    //{ alphabet: 'Malayalam', testText: 'മലയാളം'}, //38M+
    { alphabet: 'Thai', testText: 'ไทย'}, //38M+
    //{ alphabet: 'Sundanese', testText: 'ᮞᮥᮔ᮪ᮓ'},
    //{ alphabet: 'Gurmukhi', testText: 'ਗੁਰਮੁਖੀ'}, //22M+
    { alphabet: 'Lao', testText: 'ລາວ'}, // 22M+
    //{ alphabet: 'Odia', testText: 'ଉତ୍କଳ'}, // 21M+
    { alphabet: 'Ge\'ez', testText: 'ግዕዝ'},  // 18M
    //{ alphabet: 'Sinhalese', testText: 'සිංහල'}, // 14.4M
    { alphabet: 'Hebrew', testText: 'אלפבית'}, // 14M
    { alphabet: 'Armenian', testText: 'Հայոց'}, //12M
    //{ alphabet: 'Khmer', testText: 'ខ្មែរ'}, // 11.4M
    { alphabet: 'Greek', testText: 'Ελληνικό'}, // 11M
    //{ alphabet: 'Batak', testText: 'ᯅᯖᯂ᯲ᯆᯗᯂ᯳ᯅᯖᯃ᯳ᯅᯗᯂ᯲ᯅᯖᯄᯱ᯲'}, //8.5M
    //{ alphabet: 'Lontara', testText: 'ᨒᨚᨈᨑ'}, // 5.6M
    //{ alphabet: 'Balinese', testText: 'ᬩᬮᬶ'}, // 6M
    //{ alphabet: 'Tibetan', testText: 'བོད་'}, // 5M
    { alphabet: 'Georgian', testText: 'ქართული'}, // 4.5M
    { alphabet: 'Modern Yi', testText: 'ꆈꌠ'}, // 4M
    { alphabet: 'Mongolian', testText: 'ᠮᠣᠩᠭᠣᠯ'}, // 2M
    { alphabet: 'Tifinagh', testText: 'ⵜⵉⴼⵉⵏⴰⵖ'}, // 1M
    { alphabet: 'Tai Le', testText: 'ᥖᥭᥰᥘᥫᥴ'}, // 0.75M
    //{ alphabet: 'New Tai Lue', testText: 'ᦑᦟᦹᧉ'}, // 0.55M
    { alphabet: 'Syriac', testText: 'ܣܘܪܝܬ'}, // 0.4M
    //{ alphabet: 'Thaana', testText: 'ދިވެހި'}, // 
    { alphabet: 'Inuktitut', testText: 'ᐃᓄᒃᑎᑐᑦ'}, //0.035M
    { alphabet: 'Cherokee', testText: 'ᏣᎳᎩ'},  // 0.02M
    //{ alphabet: 'Hanunó\'o', testText: 'ᜱᜨᜳᜨᜳᜢ'}, // 0.013M
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
