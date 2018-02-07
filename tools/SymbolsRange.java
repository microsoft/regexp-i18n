package com.microsoft;

import static com.microsoft.Predicate.*;
import static com.microsoft.CompositePredicate.*;
import static com.microsoft.UnicodeBlockPredicate.*;

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
        System.out.println("// Constants below are generated with ./tools/symbols-range.sh");
        print(true);
        print(false);
    }

    private static void print(boolean astral) {
        printRange(astral, ALPHA, "LETTERS", null);
        printRange(astral, DIACRITICS, "DIACRITICS",
                "Group of symbols which are not letters but mutate previous letter.");
        printRange(astral, DIGIT, "DIGITS");
        printRange(astral, or(ALPHA, DIACRITICS), "LETTERS_AND_DIACRITICS");
        printRange(astral, or(ALPHA, DIACRITICS), "LETTERS_DIGITS_AND_DIACRITICS");
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
    private static String code(int codepoint) {
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

    public static void printRange(boolean astral, Predicate predicate, String name) {
        printRange(astral, predicate, name, null);
    }

    /**
     * Prints the ranges of the symbols matching to the given predicate
     * @param predicate
     * @param name display name of the range
     * @param comment
     */
    public static void printRange(boolean astral, Predicate predicate, String name, String comment) {
        if (comment != null) {
            System.out.println("// " + comment);
        }
        StringBuilder result = new StringBuilder("const ");
        result.append(name);
        if (astral) {
            result.append("_ASTRAL");
        }

        result.append(" = '");

        int max = astral ? Character.MAX_CODE_POINT : 0xFFFF;

        int i = 0;
        int firstAlpha = -1;
        int lastAlpha = -1;

        while (i < max) {

            while(i < max) {
                if (predicate.test(i)) {
                    firstAlpha = i;
                    break;
                }
                i++;
            }

            while(i < max) {
                boolean lastSymbol = i == max - 1;
                if(!predicate.test(i) || lastSymbol) {
                    lastAlpha = lastSymbol ? i : i-1;

                    if (firstAlpha > firstAlpha) {
                        throw new RuntimeException(firstAlpha + " > " + lastAlpha);
                    }

                    if (lastAlpha != firstAlpha) {
                        result.append(code(firstAlpha) + '-' + code(lastAlpha));
                    } else {
                        result.append(code(firstAlpha));
                    }
                    break;

                }
                i++;
            }
            i++;
        }

        result.append("';");
        System.out.println(result.toString());
    }
}
