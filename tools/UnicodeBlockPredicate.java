package com.microsoft;

import java.lang.Character.UnicodeBlock;

public class UnicodeBlockPredicate implements Predicate {

    public static final UnicodeBlockPredicate BASIC_LATIN =
            new UnicodeBlockPredicate(UnicodeBlock.BASIC_LATIN);

    public static final UnicodeBlockPredicate TAMIL =
            new UnicodeBlockPredicate(UnicodeBlock.TAMIL);

    public static final UnicodeBlockPredicate KANNADA =
            new UnicodeBlockPredicate((UnicodeBlock.KANNADA));

    public static final UnicodeBlockPredicate BURMESE =
            new UnicodeBlockPredicate(UnicodeBlock.MYANMAR);

    public static final UnicodeBlockPredicate SUNDANESE =
            new UnicodeBlockPredicate(UnicodeBlock.SUNDANESE);
    public static final UnicodeBlockPredicate ODIA =
            new UnicodeBlockPredicate(UnicodeBlock.ORIYA);

    public static final UnicodeBlockPredicate KHMER =
            new UnicodeBlockPredicate(UnicodeBlock.KHMER);

    public static final UnicodeBlockPredicate BATAK =
            new UnicodeBlockPredicate(UnicodeBlock.BATAK);

    public static final UnicodeBlockPredicate TIBETAN =
            new UnicodeBlockPredicate(UnicodeBlock.TIBETAN);

    private UnicodeBlock block;

    public UnicodeBlockPredicate(UnicodeBlock block) {
        this.block = block;
    }

    @Override
    public boolean test(int codepoint) {
        return UnicodeBlock.of(codepoint) == block;
    }
}
