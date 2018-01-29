public class SymbolsRange {

    public static void main(String[] args) {
        printRange();
    }

    /*public static String code(int code) {
        StringBuilder result = new StringBuilder();
        char[] test = Character.toChars(code);
        for (char ch: test) {
            result.append(code(ch));
        }
        return result.toString();
    }*/

    private static String code(int ch) {
        String result = Integer.toHexString(ch);

        while (result.length() < 4) {
            result = "0" + result;
        }
        return "\\u"+result;
    }

    public static void printRange() {
        StringBuilder result = new StringBuilder();

        int max = Character.MAX_CODE_POINT;

        int i = 0;
        int first_alpha = -1;
        int last_alpha = -1;

        while (i < max) {

            while(i < max) {
                if (Character.isAlphabetic(i)) {
                    first_alpha = last_alpha = i;
                    break;
                }
                i++;
            }

            while(i < max) {
                if(!Character.isAlphabetic(i)) {
                    last_alpha = i-1;
                    if (last_alpha != first_alpha) {
                        result.append(code(first_alpha) + '-' + code(last_alpha));
                    } else {
                        result.append(code(first_alpha));
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
