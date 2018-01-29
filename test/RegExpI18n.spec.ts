import RegExpI18n = require('../src/RegExpI18n');

interface Spec {
    name: string;
    testText: string;
}

// Every spec represens separate langauge
// Languages are ordered in the usage order
const smokeTests: Spec[] = [
    { name: 'Latin', testText: 'abcZYX' },
    { name: 'Latin suplemental', testText: 'ÀÊÖØåöøüÿ' },
    { name: 'Chinese', testText: '他走過城市的狗他的兄弟生氣了' },
    { name: 'Chinese Simplified', testText: '渔夫从远处看见一位渔夫罕见的字符' },
    { name: 'Arabic', testText: 'العربية' },  // 660M
    { name: 'Devenagari', testText: 'देवनागरीलिपि' }, //600M+
    { name: 'Eastern Nagari', testText: 'পৰবনগৰ' }, //300M+
    { name: 'Cyrillic', testText: 'НочьУлицаФонарьАптекаЃё' }, //250M+
    { name: 'Kana', testText: 'かなカナウィキペディア日本語版' }, //120M+   
    { name: 'Javanese', testText: 'ꦗꦮ' }, //80M+    
    { name: 'Hangul', testText: '한글조선글' }, //80M+    
    { name: 'Telugu', testText: 'తెలుగు' }, //74M+
    { name: 'Tamil', testText: 'தமிழ்' }, //60M+
    { name: 'Gujarati', testText: 'ગુજરાતી' }, //48M+
    { name: 'Kannada', testText: 'ಕನ್ನಡ' }, // 45M+
    { name: 'Burmese', testText: 'မြန်မာ' }, //39M+
    { name: 'Malayalam', testText: 'മലയാളം' }, //38M+
    { name: 'Thai', testText: 'ไทย' }, //38M+
    { name: 'Sundanese', testText: 'ᮞᮥᮔ᮪ᮓ' },
    { name: 'Gurmukhi', testText: 'ਗੁਰਮੁਖੀ' }, //22M+
    { name: 'Lao', testText: 'ລາວ' }, // 22M+
    { name: 'Odia', testText: 'ଉତ୍କଳ' }, // 21M+
    { name: 'Ge\'ez', testText: 'ግዕዝ' },  // 18M
    { name: 'Sinhalese', testText: 'සිංහල' }, // 14.4M
    { name: 'Hebrew', testText: 'אלפבית' }, // 14M
    { name: 'Armenian', testText: 'Հայոց' }, //12M
    { name: 'Khmer', testText: 'ខ្មែរ' }, // 11.4M
    { name: 'Greek', testText: 'Ελληνικό' }, // 11M
    { name: 'Batak', testText: 'ᯅᯖᯂ᯲ᯆᯗᯂ᯳ᯅᯖᯃ᯳ᯅᯗᯂ᯲ᯅᯖᯄᯱ᯲' }, //8.5M
    { name: 'Lontara', testText: 'ᨒᨚᨈᨑ' }, // 5.6M
    { name: 'Balinese', testText: 'ᬩᬮᬶ' }, // 6M
    { name: 'Tibetan', testText: 'བོད་' }, // 5M
    { name: 'Georgian', testText: 'ქართული' }, // 4.5M
    { name: 'Modern Yi', testText: 'ꆈꌠ' }, // 4M
    { name: 'Mongolian', testText: 'ᠮᠣᠩᠭᠣᠯ' }, // 2M
    { name: 'Tifinagh', testText: 'ⵜⵉⴼⵉⵏⴰⵖ' }, // 1M
    { name: 'Tai Le', testText: 'ᥖᥭᥰᥘᥫᥴ' }, // 0.75M
    { name: 'New Tai Lue', testText: 'ᦑᦟᦹᧉ' }, // 0.55M
    { name: 'Syriac', testText: 'ܣܘܪܝܬ' }, // 0.4M
    { name: 'Thaana', testText: 'ދިވެހި' }, // 
    { name: 'Inuktitut', testText: 'ᐃᓄᒃᑎᑐᑦ' }, //0.035M
    { name: 'Cherokee', testText: 'ᏣᎳᎩ' },  // 0.02M
    { name: 'Hanunó\'o', testText: 'ᜱᜨᜳᜨᜳᜢ' }, // 0.013M
];

// This tests should contain no letter symbols only
const negativeTests: Spec[] = [
    { name: 'digits', testText: '0123456789' },
    { name: 'special', testText: '!@#$$%^&*()-=_+' }

];
// replace all not letter characters
const matchNoLetters = new RegExpI18n('[^\\pL]', 'g');

const matchLetters = new RegExpI18n('[\\pL]', 'g');

describe('SmokeTests', function () {
    smokeTests.forEach(spec => {
        it(spec.name, () => {
            expect(spec.testText.replace(matchNoLetters, '')).toBe(spec.testText);
        });
    });
});

describe('NegativeTests', function () {
    negativeTests.forEach(spec => {
        it(spec.name, () => {
            expect(spec.testText.replace(matchLetters, '')).toBe(spec.testText);
        });
    });
});
