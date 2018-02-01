# RegExpI18n library [![Build Status](https://travis-ci.org/Microsoft/regexp-i18n.svg?branch=master)](https://travis-ci.org/Microsoft/regexp-i18n)
Library provides range of the all letters in Unicode.
This ranges could be used in the RegExp as a part of the range. As ranges include astral symbols from astral pages you need to pass ~u~ flag to the regexp.

Library tested on latest versons of Safari, Chrome, Firefox and Edge browsers.

# Overview
The library designed to provide a way to match any i18n character in any alphabet.

The library exports following building blocks:
## Constants
Constants represent range of the symbols. You could use any of the constants provided as a part of the range regexp expression.

```
import { Constants } = from 'regexp-i18n';

const matchLetterPattern: '[' + Constants.LETTERS + ']';
const rx = new RegExp(matchLetterPattern, 'ug');
let data = '他走過城市的狗他的兄弟生氣了123';
// prints 123
console.log(data.replace(rx, ''));;

```
1. `LETTERS` - all 18n letters
1. `LETTERS_AND_DIACRITICS` - all i18n letters and diacritics
1. `LETTERS_DIGITS_AND_DIACRITICS` - all i18n letters, digits and diacritics
1. `DIACRITICS` - Special class of characters. Modifes previous character. Can't be stripped out without changing the text meaning.
1. `DIGITS` - all i18n digits

## Patterns
The patterns are regular expressions ranges well tested and reusable.
1. `MATCH_LETTER` - Matches all 18n characters with diacritics. This is a strict pattern. All outstanding diacritics wan't be matched.
1. `STRIP_SPECIAL` - Matches special characters in the begining and the end of the string. 


```
import { Constants } = from 'regexp-i18n';

const rx = new RegExp(STRIP_SPECIAL, 'ug');
let data = '$ಕನ್ನಡೈಈ123#';
// prints ಕನ್ನಡೈಈ123
console.log(data.replace(rx, ''));;

```

## Functions

`replaceNotMatching(pattern: string, replaceValue: string, text: string): string;`

Attempt to make a function replacing everythin not matching to the pattern.
Motivation for it that it is impossible to make an inverse `MATCH_LETTER` pattern.
Not very reliable in the complex cases yet.

# Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
