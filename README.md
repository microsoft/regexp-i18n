# RegExpI18n library [![Build Status](https://travis-ci.org/Microsoft/regexp-i18n.svg?branch=master)](https://travis-ci.org/Microsoft/regexp-i18n)
Library provides range of the all letters in Unicode.
This ranges could be used in the RegExp as a part of the range. As ranges include astral symbols from astral pages you need to pass ~u~ flag to the regexp.

Library tested on latest versons of Safari, Chrome, Firefox and Edge browsers.

Usage example:

```
import { LETTERS } = from 'regexp-i18n';

const regexp = new RegExp('[^' + LETTERS + ']', 'gu');
data = '他走過城市的狗他的兄弟生氣了 345 &99';

console.log(data.replace(regexp, '');
```

output will be:
```
他走過城市的狗他的兄弟生氣了
```

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
