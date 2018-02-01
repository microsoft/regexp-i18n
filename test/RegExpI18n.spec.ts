import _ = require('lodash');

import { Patterns, replaceNotMatching } from '../src/RegExpI18n';

// tslint:disable:max-line-length

interface Spec {
    name: string;
    testText: string;
    // if not specified the expected result is original string
    expected?: string;
    // where testcase came from if not specified it is from https://en.wikipedia.org/wiki/List_of_writing_systems
    // See List of writing scripts by adoption section.
    source?: string;
}

interface TestCase {
    name: string;
    pattern: string;
    tests: Spec[];
    testFunction: (spec: Spec) => void;
    setup?: () => void;
    tearDown?: () => void;
}

const testData: Spec[] = [
    { name: 'Latin', testText: 'dabcZYX' },
    { name: 'Latin suplemental', testText: 'ÀÊÖØåöøüÿ'  },
    { name: 'Chinese', testText: '他走過城市的狗他的兄弟生氣了' },
    { name: 'Chinese Simplified', testText: '渔夫从远处看见一位渔夫罕见的字符' },
    { name: 'Arabic', testText: 'العربية' },  // 660M
    {
        name: 'Devenagari',
        testText: 'ण्कण्खण्गण्घ्ङण्चण्छ्जण्झण्ञण्टण्ठण्डण्ढण्णण्तण्थण्दण्धण्नण्पण्फण्बण्भण्मण्यण्रकेऐखक्फ',
        source: 'https://en.wikipedia.org/wiki/Devanagari see Most Frequent Conjuncts'
    }, //600M+
    { 
        name: 'Eastern Nagari', 
        testText: 'অঅআঅ্যাএ্যাঅৗইঈউঊ',
        source: 'https://en.wikipedia.org/wiki/Eastern_Nagari_script#Vowels'
     }, //300M+
    { name: 'Cyrillic', testText: 'НочьУлицаФонарьАптекаЃё' }, //250M+
    { name: 'Kana', testText: 'かなカナウィキペディア日本語版' }, //120M+   
    { name: 'Javanese', testText: 'ꦗꦮ' }, //80M+    
    { name: 'Hangul', testText: '한글조선글' }, //80M+    
    { name: 'Telugu', testText: 'తెలుగు' }, //74M+
    { name: 'Tamil', testText: 'நன்னூல்' }, //60M+
    { name: 'Gujarati', testText: 'ગુજરાતી' }, //48M+
    { 
        name: 'Kannada',
        testText: 'ಕನ್ನಡೈಈ',
        source: 'https://en.wikipedia.org/wiki/Kannada'
     }, // 45M+
    { name: 'Burmese', testText: 'မြန်မာ' }, //39M+
    {
        name: 'Malayalam',
        testText: 'മലയാളംഅഇഉഋഎഐഔഅംഅഃചഛഘചഠഷചന്ദ്രക്കല',
        source: 'https://en.wikipedia.org/wiki/Virama see language mention'
     }, //38M+
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
    { 
        name: 'Tibetan', 
        testText: 'ས藏文有三十个辅音字母具体如下表所示འ་ཆུངམཚམསམཐུན་འཚམསའཐུནདགེ་འདུནསྤྱིར་藏文音节འགྲེམས་སྟོན་结构规则要分析藏文结构必须先得找出根字母然后其他的部分根据结构规则就能找到',
        source: 'https://w3c.github.io/tlreq/'
    }, // 5M
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

const testCases: TestCase[] = [
    {
        name: 'SmokeTests',
        // we replace all non letter characters
        pattern: Patterns.MATCH_LETTER,
        
        testFunction: function (spec: Spec) {            
            const actual = replaceNotMatching(this.pattern, '', spec.testText);
            const expected = spec.expected ? spec.expected : spec.testText;

            expect(actual).toBe(expected);
        },

        setup: function() {
            this.tests.forEach(test => {
                test.expected = test.testText;
                test.testText = 1 + test.testText + 2;
            });
        },

        tests: _.cloneDeep(testData)
    },

    {
        name: 'StripSpecialCharacters',
        pattern: Patterns.STRIP_SPECIAL,
        //pattern: '^[a-zA-Z

        testFunction: function (spec: Spec) {
            const actual = spec.testText.replace(new RegExp(this.pattern, 'gu'), '');
            const expected = spec.expected ? spec.expected : spec.testText;

            expect(actual).toBe(expected);
        },

        setup: function() {
            this.tests.forEach(test => {

                const mid = test.testText.length / 2;
                // adding number in the middle to make sure it is not stripped down
                test.testText = test.testText.substring(0, mid) + '%' + test.testText.substring(mid);
                test.expected = test.testText;
                // adding numbers around to make sure they are stripped down
                test.testText = '#!' + test.testText + '^@';
            });
        },

        tests: _.cloneDeep(testData)
    }
];

testCases.forEach(testCase => {
    describe(testCase.name, () => {
        if (testCase.setup) {
            testCase.setup();
        }

        testCase.tests.forEach(spec => {
            it(spec.name, () => {
                testCase.testFunction(spec);
            });
        });

        if (testCase.tearDown) {
            testCase.tearDown();
        }
    });
});
