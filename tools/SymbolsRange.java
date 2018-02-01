package com.microsoft;

import static com.microsoft.Predicate.*;
import static com.microsoft.CompositePredicate.*;
import static com.microsoft.UnicodeBlockPredicate.*;

public class SymbolsRange {

   private static Predicate ALPHA = new Predicate() {

        @Override
        public boolean test(int codepoint) {
            return Character.isAlphabetic(codepoint);
        }
    };

   private static Predicate NOT_ALPHA_NUMERIC = new Predicate() {
       @Override
       public boolean test(int codepoint) {
           return !Character.isAlphabetic(codepoint) && !Character.isDigit(codepoint);
       }
   };

    private static Predicate OTHER_PUNCTUATION = new Predicate() {

        @Override
        public boolean test(int codepoint) {
            int type = Character.getType(codepoint);
            return type == Character.OTHER_PUNCTUATION;
        }
    };

   private static Predicate MARKS = new Predicate() {

       final int MASK = ((1<<Character.NON_SPACING_MARK) |
               (1<<Character.ENCLOSING_MARK)   |
               (1<<Character.COMBINING_SPACING_MARK));

       @Override
       public boolean test(int codepoint) {
           int type = Character.getType(codepoint);
           return (MASK & (1 << type)) != 0 && !Character.isAlphabetic(codepoint);
       }
   };

   private static Predicate SPACE_SEPARATOR = new Predicate() {
       @Override
       public boolean test(int codepoint) {
           return Character.getType(codepoint) == Character.SPACE_SEPARATOR;
       }
   };

   private static Predicate EXTRA_LANGUAGES = or(
           and(TAMIL, MARKS),
           and(BURMESE, MARKS),
           and(KANNADA, MARKS),
           and(BURMESE, MARKS),
           and(SUNDANESE, MARKS),
           and(ODIA, MARKS),
           and(KHMER, MARKS),
           and(BATAK, MARKS),
           // Tibetian modifier
           and(codepoint(0x0f0b))
   );

    public static void main(String[] args) {
        printRange("Alpha", ALPHA);
        printRange("Extra", EXTRA_LANGUAGES);
    }

    /**
     * Function for doing temporary tests
     * @param symbols
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

    public static void printAll(Predicate p) {
        for (int i = 0; i < Character.MAX_CODE_POINT + 1; i++) {
            if (p.test(i)) {
                printCodepoint(i);
            }
        }
    }

    private static String code(int ch) {
        StringBuilder result = new StringBuilder();
        String hex = Integer.toHexString(ch);

        if (ch < 128) {
            result.append(Character.toString((char)ch));
        } else if (ch < 256) {
            result.append("\\x").append(hex);
        } else if (ch < 0x1000) {
            result.append("\\u0").append(hex);
        } else if (ch < 0x10000){
            result.append("\\u").append(hex);
        } else {
            result.append("\\u").append('{').append(hex).append('}');
        }
        return result.toString();
    }

    public static void printRange(String name, Predicate predicate) {
        System.out.println(name + ":");
        StringBuilder result = new StringBuilder();

        int max = Character.MAX_CODE_POINT;

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

        System.out.println(result.toString());
    }
}
