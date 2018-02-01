package com.microsoft;

public interface Predicate {
    boolean test(int codepoint);

    Predicate TRUE = codepoint -> true;

    Predicate FALSE = codepoint -> false;


    static Predicate codepoint(int cp) {
        return codepoint -> cp == codepoint;
    }

    Predicate ALPHA = codepoint -> Character.isAlphabetic(codepoint);

    Predicate LETTER = codepoint -> Character.isLetter(codepoint);

    Predicate MARKS = new Predicate() {

        final int MASK = ((1<<Character.NON_SPACING_MARK) |
                (1<<Character.ENCLOSING_MARK)   |
                (1<<Character.COMBINING_SPACING_MARK));

        @Override
        public boolean test(int codepoint) {
            int type = Character.getType(codepoint);
            return (MASK & (1 << type)) != 0 && !Character.isAlphabetic(codepoint);
        }
    };

    Predicate OTHER_PUNCTUATION = codepoint -> {
        int type = Character.getType(codepoint);
        return type == Character.OTHER_PUNCTUATION;
    };

    Predicate SPACE_SEPARATOR = codepoint -> Character.getType(codepoint) == Character.SPACE_SEPARATOR;
}