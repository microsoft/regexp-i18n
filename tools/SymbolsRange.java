interface Predicate {
    boolean test(int codepoint);
}

public class SymbolsRange {

   private static Predicate ALPHA = new Predicate() {
       @Override
       public boolean test(int codepoint) {
           return Character.isAlphabetic(codepoint);
       }
   };

    public static void main(String[] args) {
        printRange(ALPHA);
    }

    /**
     * Function for doing temporary tests
     * @param symbols
     */
    public static void alphaTest(String symbols) {
        int length = symbols.codePointCount(0, symbols.length());
        for (int i = 0; i < length; i++) {
            int codepoint = symbols.codePointAt(i);
            System.out.println(new String(Character.toChars(codepoint)) + " : " + Character.isAlphabetic(codepoint) + " - " + Integer.toHexString(codepoint));
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

    public static void printRange(Predicate predicate) {
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

