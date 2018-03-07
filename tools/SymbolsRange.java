package com.microsoft;

import static com.microsoft.Predicate.*;
import static com.microsoft.CompositePredicate.*;
import static com.microsoft.UnicodeBlockPredicate.*;

enum RangeType {
    ASCII_ONLY {
        @Override
        int maxCodePoint() {
            return 255;
        }

        @Override
        String suffix() {
            return "_ASCII";
        }
    },
    I18N {
        @Override
        int maxCodePoint() {
            return 0xFFFF;
        }

        @Override
        String suffix() {
            return "";
        }
    },
    I18N_ASTRAL {
        @Override
        int maxCodePoint() {
            return Character.MAX_CODE_POINT;
        }

        @Override
        String suffix() {
            return "_ASTRAL";
        }
    };

    abstract int maxCodePoint();
    abstract String suffix();
}

enum Format {
    STRING {
        @Override
        String definition(String name) {
            return "    " + name + ": ";
        }

        @Override
        String item(int codePoint) {
            return SymbolsRange.code(codePoint);
        }

        @Override
        String range(int first, int last) {
            return SymbolsRange.code(first) + '-' + SymbolsRange.code(last);
        }

        @Override
        String start() {
            return "'";
        }

        @Override
        String end() {
            return "'";
        }

        @Override
        String separator() {
            return "";
        }
    },

    NUMERIC {
        @Override
        String definition(String name) {
            return "    " + name + "_RANGE: ";
        }

        @Override
        String item(int codePoint) {
            return range(codePoint, codePoint);
        }

        @Override
        String range(int first, int last) {
            return "[" + first + ", " + last + "]";
        }

        @Override
        String start() {
            return "[";
        }

        @Override
        String end() {
            return "] as [number, number][]";
        }

        @Override
        String separator() {
            return ", ";
        }
    };

    abstract String definition(String name);

    abstract String item(int codePoint);

    abstract String range(int first, int last);

    abstract String start();
    abstract String end();

    abstract String separator();
}

public class SymbolsRange {

   private static Predicate DIACRITICS = or(
           and(DEVANAGARI, MARKS),
           and(TAMIL, MARKS),
           and(BURMESE, MARKS),
           and(KANNADA, MARKS),
           and(MALAYALAM, MARKS),
           and(BURMESE, MARKS),
           and(SUNDANESE, MARKS),
           and(ODIA, MARKS),
           and(KHMER, MARKS),
           and(BATAK, MARKS),
           and(EASTERN_NAGARI, MARKS),
           // Tibetian modifier
           and(codepoint(0x0f0b))
   );

    public static void main(String[] args) {
        System.out.println("// tslint:disable:max-line-length");
        System.out.println("// Constants below are generated with ./tools/symbols-range.sh");
        System.out.println("export default {");
        print(RangeType.I18N_ASTRAL);
        print(RangeType.I18N);

        // Limit constant for Ranges
        System.out.println("    CODE_POINT_LIMIT: " + Format.NUMERIC.range(0, Character.MAX_CODE_POINT) +
                " as [number, number]");
        System.out.println("};");
        System.out.println("");
    }

    private static void print(RangeType rangeType) {
        Format[] formats = rangeType == RangeType.I18N_ASTRAL ? new Format[] { Format.STRING, Format.NUMERIC } :
            new Format[] { Format.STRING };
        for (Format formatter : formats) {
            printRange(rangeType, formatter,  ALPHA, "LETTERS");
            printRange(rangeType, formatter,  DIACRITICS, "DIACRITICS");
            printRange(rangeType, formatter,  DIGIT, "DIGITS");
            printRange(rangeType, formatter, or(ALPHA, DIACRITICS), "LETTERS_AND_DIACRITICS");
            printRange(rangeType, formatter, or(ALPHA, DIACRITICS, DIGIT), "LETTERS_DIGITS_AND_DIACRITICS");
        }
    }

    /**
     * Prints all codepoints in the string matching to the predicate.
     *
     * @param symbols to analyze
     * @param p predicate to filter symbols
     */
    public static void printMatch(String symbols, Predicate p) {
        int length = symbols.codePointCount(0, symbols.length());
        for (int i = 0; i < length;) {
            int codepoint = symbols.codePointAt(i);
            i += Character.charCount(codepoint);
            if (p.test(codepoint)) {
                printCodepoint(codepoint);
            }
        }
    }

    private static void printCodepoint(int codepoint) {
        String view = new String(Character.toChars(codepoint));
        String hex = code(codepoint);
        int type = Character.getType(codepoint);
        Character.UnicodeBlock block = Character.UnicodeBlock.of(codepoint);

        System.out.println(String.format("%s %x %s type: %d %s",
                view, codepoint, hex, type, block));
    }

    private static void printSymbol(int codepoint) {
        System.out.print(new String(Character.toChars(codepoint)));
    }

    /**
     * Prints all valid codepoints in Unicode table matching to the predicate.
     *
     * @param p
     */
    public static void printAll(Predicate p) {
        for (int i = 0; i < Character.MAX_CODE_POINT + 1; i++) {
            if (p.test(i)) {
                printCodepoint(i);
            }
        }
    }

    /**
     * Formats the codepoint to conform javascript range format
     * @param codepoint
     * @return
     */
    protected static String code(int codepoint) {
        StringBuilder result = new StringBuilder();
        String hex = Integer.toHexString(codepoint);

        if (codepoint < 128) {
            result.append(Character.toString((char)codepoint));
        } else if (codepoint < 256) {
            result.append("\\x").append(hex);
        } else if (codepoint < 0x1000) {
            result.append("\\u0").append(hex);
        } else if (codepoint < 0x10000){
            result.append("\\u").append(hex);
        } else {
            result.append("\\u").append('{').append(hex).append('}');
        }
        return result.toString();
    }

    /**
     * Prints the ranges of the symbols matching to the given predicate
     * @param predicate
     * @param name display name of the range
     * @param comment
     */
    public static void printRange(RangeType rangeType, Format format, Predicate predicate, String name) {
        StringBuilder result = new StringBuilder(format.definition(name + rangeType.suffix()));
        result.append(format.start());

        boolean hasPrevious = false;

        int max = rangeType.maxCodePoint();

        int i = 0;
        int firstAlpha = -1;
        int lastAlpha = -1;

        while (i <= max) {

            while(i <= max) {
                if (predicate.test(i)) {
                    firstAlpha = i;
                    break;
                }
                i++;
            }

            while(i <= max) {
                boolean lastSymbol = i == max;
                if(!predicate.test(i) || lastSymbol) {
                    lastAlpha = lastSymbol ? i : i-1;

                    if (firstAlpha > firstAlpha) {
                        throw new RuntimeException(firstAlpha + " > " + lastAlpha);
                    }

                    if (hasPrevious) {
                        result.append(format.separator());
                    }

                    if (lastAlpha != firstAlpha) {
                        result.append(format.range(firstAlpha, lastAlpha));
                        hasPrevious = true;
                    } else {
                        result.append(format.item(firstAlpha));
                        hasPrevious = true;
                    }
                    break;

                }
                i++;
            }
            i++;
        }

        result.append(format.end()).append(',');
        System.out.println(result.toString());
    }
}
