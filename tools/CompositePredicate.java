package com.microsoft;

public class CompositePredicate implements Predicate {
    private static abstract class Operator {
        private static Operator AND = new Operator() {
            @Override
            boolean perform(boolean a, boolean b) {
                return a && b;
            }

            @Override
            boolean test(boolean val) {
                return val;
            }
        };

        private static Operator OR = new Operator() {
            @Override
            boolean perform(boolean a, boolean b) {
                return a || b;
            }

            @Override
            boolean test(boolean val) {
                return !val;
            }
        };

        /**
         *
         * @param a
         * @param b
         * @return
         */
        abstract boolean perform(boolean a, boolean b);

        /*
         * return true if perform call could modify value
         * false otherwise
         */
        abstract boolean test(boolean val);
    }

    private Operator type;
    private Predicate[] predicates;

    public static Predicate or(Predicate ...predicates) {
        return new CompositePredicate(Operator.OR, predicates);
    }

    public static Predicate and(Predicate ...predicates) {
        return new CompositePredicate(Operator.AND, predicates);
    }

    static Predicate not(Predicate predicate) {
        return codepoint -> !predicate.test(codepoint);
    };

    private CompositePredicate(Operator type, Predicate ... predicates) {
        this.type = type;
        this.predicates = predicates;
    }


    @Override
    public boolean test(int codepoint) {
        boolean result = predicates[0].test(codepoint);

        for (int i = 1; i < predicates.length; i++) {
            if (type.test(result)) {
                result = type.perform(result, predicates[i].test(codepoint));
            } else {
                break;
            }
        }

        return result;
    }
}
