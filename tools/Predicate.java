package com.microsoft;

public interface Predicate {
    boolean test(int codepoint);

    Predicate TRUE = codepoint -> true;

    Predicate FALSE = codepoint -> false;


    static Predicate codepoint(int cp) {
        return codepoint -> cp == codepoint;
    }
}